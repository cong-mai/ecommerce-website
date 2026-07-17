const Product = require("../models/ProductModel")
const EmbeddingService = require("./EmbeddingService")

const buildEmbeddingText = (name, type, description) => {
    return [name, type, description].filter(Boolean).join(' - ')
}

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                })
            }
            let embedding = undefined
            try {
                embedding = await EmbeddingService.generateEmbedding(buildEmbeddingText(name, type, description))
            } catch (e) {
                console.error('[ProductService] embedding generation failed on create:', e.message)
            }

            const newProduct = await Product.create({
                name,
                image,
                type,
                countInStock: Number(countInStock),
                price,
                rating,
                description,
                discount,
                embedding,
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            if (data.name || data.type || data.description) {
                try {
                    data.embedding = await EmbeddingService.generateEmbedding(buildEmbeddingText(
                        data.name ?? checkProduct.name,
                        data.type ?? checkProduct.type,
                        data.description ?? checkProduct.description
                    ))
                } catch (e) {
                    console.error('[ProductService] embedding generation failed on update:', e.message)
                }
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1], '$options': 'i' } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find().sort({ createdAt: -1, updatedAt: -1 })
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const MIN_SIMILARITY_SCORE = 0.15

const searchProductSemantic = (query, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const queryVector = await EmbeddingService.generateEmbedding(query)
            const candidates = await Product.find({ embedding: { $exists: true, $ne: [] } })
            const results = candidates
                .map((product) => {
                    const obj = product.toObject()
                    obj.score = EmbeddingService.cosineSimilarity(queryVector, product.embedding)
                    return obj
                })
                .filter((product) => product.score >= MIN_SIMILARITY_SCORE)
                .sort((a, b) => b.score - a.score)
                .slice(0, limit || 10)
            resolve({
                status: 'OK',
                message: 'Success',
                data: results,
                total: results.length
            })
        } catch (e) {
            console.error('[ProductService] semantic search failed, falling back to regex:', e.message)
            try {
                const fallbackResults = await Product.find({ name: { '$regex': query, '$options': 'i' } }).limit(limit || 10)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: fallbackResults,
                    total: fallbackResults.length
                })
            } catch (fallbackError) {
                reject(fallbackError)
            }
        }
    })
}

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType,
    searchProductSemantic
}