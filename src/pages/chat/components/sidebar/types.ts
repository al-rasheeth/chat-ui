import { Settings } from "../../../../store/types";

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

export interface ChatListItemProps {
  chat: Chat;
  onDelete: (id: string) => void;
  isActive?: boolean;
  onClick: () => void;
}

export interface SettingsSectionProps {
  settings: Settings;
  onChange: (settings: Partial<Settings>) => void;
  onSave: (settings: Partial<Settings>) => void;
  onReset: () => void;
}