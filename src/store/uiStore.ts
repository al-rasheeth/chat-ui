import { create } from 'zustand';
import { UIState } from './types';

interface UIStore extends UIState {
  setActiveChat: (chatId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setWorkflowStep: (step: number) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  activeChatId: null,
  isLoading: false,
  currentWorkflowStep: 0,
  isSidebarCollapsed: false,

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
  toggleSidebar: () =>
    set((state) => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    })),
})); 