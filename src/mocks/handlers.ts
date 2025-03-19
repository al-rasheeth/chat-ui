import { http, HttpResponse } from 'msw'

interface ChatRequest {
  message: string;
}

export const handlers = [
  http.post('/api/chat/send', async ({ request }) => {
    const body = await request.json() as ChatRequest
    const { message } = body

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return HttpResponse.json({
      response: {
        text: `This is a mock response to: "${message}". The AI would process this in a real application.`,
        isUser: false,
        timestamp: Date.now()
      }
    })
  })
] 