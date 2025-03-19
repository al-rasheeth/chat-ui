import { create } from 'zustand';
import { UIState } from './types';

interface UIStore extends UIState {
  setActiveChat: (chatId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setWorkflowStep: (step: number) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  activeChatId: null,
  isLoading: false,
  currentWorkflowStep: 0,

  setActiveChat: (chatId: string | null) =>
    set(() => ({
      activeChatId: chatId,
    })),
  setLoading: (isLoading: boolean) =>
    set(() => ({
      isLoading,
    })),
  setWorkflowStep: (step: number) =>
    set(() => ({
      currentWorkflowStep: step,
    })),
})); 