const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")

const round2 = (n) => Math.round(n * 100) / 100

const computeShippingPrice = (itemsPrice) => {
    if (itemsPrice >= 50) return 0
    if (itemsPrice >= 20) return 10
    return 20
}

// Prices are always derived from the live Product records here, never from
// whatever the client sent — orderItems only carries product ids/amounts.
const computeOrderPricing = async (orderItems) => {
    const products = await Promise.all(
        orderItems.map((item) => Product.findById(item.product))
    )

    const missingIndex = products.findIndex((product) => !product)
    if (missingIndex !== -1) {
        const missingItem = orderItems[missingIndex]
        return { error: `Product "${missingItem.name || missingItem.product}" is not available` }
    }

    const itemsPrice = products.reduce((total, product, index) => {
        const amount = orderItems[index].amount
        const discount = product.discount || 0
        const lineTotal = product.price * (1 - discount / 100) * amount
        return total + lineTotal
    }, 0)

    const shippingPrice = computeShippingPrice(itemsPrice)

    return {
        itemsPrice: round2(itemsPrice),
        shippingPrice,
        totalPrice: round2(itemsPrice + shippingPrice),
    }
}

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, fullName, address, city, phone, user, email } = newOrder
        try {
            const pricing = await computeOrderPricing(orderItems)
            if (pricing.error) {
                resolve({
                    status: 'ERR',
                    message: pricing.error
                })
                return
            }
            const { itemsPrice, shippingPrice, totalPrice } = pricing

            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    { new: true }
                )
                if (productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }
                else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product,
                        name: order.name
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                const arrName = newData.map((item) => item.name)
                resolve({
                    status: 'ERR',
                    message: `Product "${arrName.join(', ')}" is out of stock`
                })
            } else {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city, phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid: false,
                    paidAt: null
                })
                if (createdOrder) {
                    try {
                        await EmailService.sendEmailCreateOrder(email, orderItems)
                    } catch (emailErr) {
                        console.log('Email failed (order still created):', emailErr.message)
                    }
                    resolve({
                        status: 'OK',
                        message: 'success'
                    })
                }
            }
        } catch (e) {
            //   console.log('e', e)
            reject(e)
        }
    })
}

// const deleteManyProduct = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Product.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete product success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Promise.all(data.map(async (orderItem) => {
                await Product.findOneAndUpdate(
                    { _id: orderItem.product },
                    {
                        $inc: {
                            countInStock: +orderItem.amount,
                            selled: -orderItem.amount
                        }
                    },
                    { new: true }
                )
            }))

            const order = await Order.findByIdAndDelete(id)
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
                return
            }

            resolve({
                status: 'OK',
                message: 'success',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder
}