const dotenv = require('dotenv')
dotenv.config()
const OpenAI = require('openai')

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const EMBEDDING_MODEL = 'text-embedding-3-small'

const generateEmbedding = async (text) => {
    const start = Date.now()
    const response = await client.embeddings.create({
        model: EMBEDDING_MODEL,
        input: text
    })
    console.log(`[EmbeddingService] generated 1 embedding in ${Date.now() - start}ms`)
    return response.data[0].embedding
}

const generateEmbeddingsBatch = async (texts) => {
    const start = Date.now()
    const response = await client.embeddings.create({
        model: EMBEDDING_MODEL,
        input: texts
    })
    console.log(`[EmbeddingService] generated ${texts.length} embeddings in ${Date.now() - start}ms`)
    return response.data
        .sort((a, b) => a.index - b.index)
        .map((item) => item.embedding)
}

const cosineSimilarity = (a, b) => {
    let dot = 0
    let normA = 0
    let normB = 0
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i]
        normA += a[i] * a[i]
        normB += b[i] * b[i]
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

module.exports = {
    generateEmbedding,
    generateEmbeddingsBatch,
    cosineSimilarity
}
