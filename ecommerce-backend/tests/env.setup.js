process.env.ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'test_access_secret'
process.env.REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'test_refresh_secret'
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'
// The OpenAI SDK throws at construction time if no key is present, and
// EmbeddingService.js constructs a client at module-load time. Every test
// that pulls in app.js transitively loads it, so tests need a placeholder
// key even when they mock EmbeddingService's exported functions directly.
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'test-openai-key'
