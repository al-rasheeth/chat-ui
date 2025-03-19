export interface Message {
  id: string;
  text: string;
  isUser: boolean;
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
  model: string;
  temperature: number;
  systemPrompt: string;
  selectedModel: string;
}

export interface UIState {
  activeChatId: string | null;
  isLoading: boolean;
  currentWorkflowStep: number;
} 