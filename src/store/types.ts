export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
  lastUpdated: number;
}

export interface Settings {
  currentModel: string;
  selectedModel: string;
  currentSystemPrompt: string;
  systemPrompt: string;
}

export interface UIState {
  activeChatId: string | null;
  isLoading: boolean;
  currentWorkflowStep: number;
} 