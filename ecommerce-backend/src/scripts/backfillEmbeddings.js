const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })
const mongoose = require('mongoose')
const Product = require('../models/ProductModel')
const EmbeddingService = require('../services/EmbeddingService')

const BATCH_SIZE = 100

const buildEmbeddingText = (product) => {
    return [product.name, product.type, product.description].filter(Boolean).join(' - ')
}

const run = async () => {
    await mongoose.connect(process.env.MONGO_DB)
    console.log('Connected to DB')

    const products = await Product.find({ embedding: { $exists: false } })
    console.log(`Found ${products.length} products missing embeddings`)

    let succeeded = 0
    const failed = []

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
        const chunk = products.slice(i, i + BATCH_SIZE)
        try {
            const texts = chunk.map(buildEmbeddingText)
            const vectors = await EmbeddingService.generateEmbeddingsBatch(texts)
            await Promise.all(chunk.map((product, idx) =>
                Product.findByIdAndUpdate(product._id, { embedding: vectors[idx] })
            ))
            succeeded += chunk.length
            console.log(`Processed ${Math.min(i + BATCH_SIZE, products.length)}/${products.length}`)
        } catch (e) {
            console.error(`Chunk starting at index ${i} failed:`, e.message)
            failed.push(...chunk.map((p) => p._id.toString()))
        }
    }

    console.log(`Done. Succeeded: ${succeeded}, Failed: ${failed.length}`)
    if (failed.length) {
        console.log('Failed product IDs:', failed.join(', '))
    }
    process.exit(0)
}

run().catch((e) => {
    console.error('Backfill script failed:', e)
    process.exit(1)
})
