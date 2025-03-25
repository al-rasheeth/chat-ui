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

export enum MenuType {
  CHAT = 'chat',
  FEEM_CONVERSION = 'feem_conversion'
}

export interface UIState {
  activeChatId: string | null;
  isLoading: boolean;
  currentWorkflowStep: number;
  isSidebarCollapsed: boolean;
  activeMenu: MenuType;
} 