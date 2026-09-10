const jwt = require('jsonwebtoken')
const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const { orderItems, paymentMethod, fullName, address, city, phone } = req.body
        if (!paymentMethod || !fullName || !address || !city || !phone || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createPaypalOrder = async (req, res) => {
    try {
        const { orderItems } = req.body
        if (!Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createPaypalOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message || e
        })
    }
}

const capturePaypalOrder = async (req, res) => {
    try {
        const { paypalOrderId, orderItems, paymentMethod, fullName, address, city, phone } = req.body
        if (!paypalOrderId || !Array.isArray(orderItems) || orderItems.length === 0
            || !paymentMethod || !fullName || !address || !city || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.capturePaypalOrder(paypalOrderId, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message || e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }

        const token = req.headers.token && req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }

        let decodedUser
        try {
            decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN)
        } catch (e) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }

        const response = await OrderService.getOrderDetails(orderId)
        const orderOwnerId = response && response.data && response.data.user
        const isOwner = orderOwnerId && String(orderOwnerId) === String(decodedUser && decodedUser.id)
        if (orderOwnerId && !decodedUser?.isAdmin && !isOwner) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }

        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data= req.body.orderItems
        const orderId= req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    createPaypalOrder,
    capturePaypalOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder
}
