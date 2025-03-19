import { http, HttpResponse } from 'msw'

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatRequest {
  messages: Message[];
}

export const handlers = [
  http.post('/api/chat/send', async ({ request }) => {
    const body = await request.json() as ChatRequest
    const { messages } = body

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Create a response that references the conversation history
    const response = {
      role: 'assistant' as const,
      content: `This is a mock response to: "${messages[messages.length - 1].content}". I can see the conversation history has ${messages.length} messages. The AI would process this in a real application.`,
      timestamp: Date.now()
    }

    return HttpResponse.json({
      response
    })
  })
] 