export interface Chat {
  id: string;
  title: string;
  timestamp: number;
}

export interface Model {
  value: string;
  label: string;
  description?: string;
}

export interface Settings {
  systemPrompt: string;
  selectedModel: string;
}

export interface ChatListItemProps {
  chat: Chat;
  onDelete: (id: string) => void;
  isActive?: boolean;
  onClick: () => void;
}

export interface SettingsSectionProps {
  settings: Settings;
  onChange: (settings: Partial<Settings>) => void;
  onSave: () => void;
  onReset: () => void;
} 