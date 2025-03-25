import { Settings } from "../../../../store/types";

export interface Chat {
  id: string;
  title: string;
  timestamp: number;
  lastUpdated: number;
}

export interface Model {
  value: string;
  label: string;
  description?: string;
}

export interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export interface SettingsSectionProps {
  settings: Settings;
  onChange: (settings: Partial<Settings>) => void;
  onSave: (settings: Partial<Settings>) => void;
  onReset: () => void;
}