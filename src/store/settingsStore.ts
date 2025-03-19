import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from './types';

interface SettingsStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  model: 'gpt-4',
  temperature: 0.7,
  systemPrompt: 'You are a helpful AI assistant.',
  selectedModel: 'gpt-4',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings: Partial<Settings>) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () =>
        set(() => ({
          settings: defaultSettings,
        })),
    }),
    {
      name: 'settings-storage',
    }
  )
); 