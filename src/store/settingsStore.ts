import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from './types';

interface SettingsStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  currentModel: 'gpt-4',
  selectedModel: 'gpt-4',
  currentSystemPrompt: 'You are a helpful AI assistant.',
  systemPrompt: 'You are a helpful AI assistant.',
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
      partialize: (state) => ({
        settings: {
          currentModel: state.settings.currentModel,
          currentSystemPrompt: state.settings.currentSystemPrompt,
        },
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Merge persisted settings with default settings
          state.settings = {
            systemPrompt: state.settings.currentSystemPrompt || defaultSettings.currentSystemPrompt,
            selectedModel: state.settings.currentModel || defaultSettings.selectedModel,
            currentModel: state.settings.currentModel,
            currentSystemPrompt: state.settings.currentSystemPrompt,
          };
        }
      },
    }
  )
); 