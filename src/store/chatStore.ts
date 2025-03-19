import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Chat, Message } from './types';

interface ChatStore {
  chats: Chat[];
  isLoading: boolean;
  error: string | null;
  addChat: (title: string) => Promise<string>;
  deleteChat: (id: string) => Promise<void>;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  updateChatTitle: (chatId: string, title: string) => Promise<void>;
  fetchChats: () => Promise<void>;
}

const STORAGE_KEY = 'chat-storage';

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      isLoading: false,
      error: null,

      fetchChats: async () => {
        set({ isLoading: true, error: null });
        try {
          const storedData = localStorage.getItem(STORAGE_KEY);
          if (storedData) {
            const { state } = JSON.parse(storedData);
            set({ chats: state.chats, isLoading: false });
          }
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch chats', isLoading: false });
        }
      },

      addChat: async (title: string) => {
        set({ isLoading: true, error: null });
        try {
          const newChat: Chat = {
            id: Date.now().toString(),
            title,
            messages: [],
            timestamp: Date.now(),
            lastUpdated: Date.now(),
          };
          
          set((state) => ({
            chats: [newChat, ...state.chats],
            isLoading: false,
          }));
          return newChat.id;
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to create chat', isLoading: false });
          throw error;
        }
      },

      deleteChat: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            chats: state.chats.filter((chat) => chat.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete chat', isLoading: false });
          throw error;
        }
      },

      addMessage: async (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
        set({ isLoading: true, error: null });
        try {
          const newMessage: Message = {
            ...message,
            id: Date.now().toString(),
            timestamp: Date.now(),
          };

          set((state) => {
            const updatedChats = state.chats.map((chat) => {
              if (chat.id === chatId) {
                // If this is the first message and it's from the user, update the title
                if (chat.messages.length === 0 && message.isUser) {
                  const title = message.text.slice(0, 50) + (message.text.length > 50 ? '...' : '');
                  return {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    lastUpdated: Date.now(),
                    title,
                  };
                }
                return {
                  ...chat,
                  messages: [...chat.messages, newMessage],
                  lastUpdated: Date.now(),
                };
              }
              return chat;
            });
            return {
              chats: updatedChats,
              isLoading: false,
            };
          });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add message', isLoading: false });
          throw error;
        }
      },

      updateChatTitle: async (chatId: string, title: string) => {
        set({ isLoading: true, error: null });
        try {
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    title,
                    lastUpdated: Date.now(),
                  }
                : chat
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update chat title', isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
); 