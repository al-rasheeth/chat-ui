import { create } from 'zustand';
import { UIState, MenuType } from './types';

interface UIStore extends UIState {
  setActiveChat: (chatId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setWorkflowStep: (step: number) => void;
  toggleSidebar: () => void;
  setActiveMenu: (menu: MenuType) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  activeChatId: null,
  isLoading: false,
  currentWorkflowStep: 0,
  isSidebarCollapsed: false,
  activeMenu: MenuType.CHAT,

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
  setActiveMenu: (menu: MenuType) =>
    set(() => ({
      activeMenu: menu,
    })),
})); 