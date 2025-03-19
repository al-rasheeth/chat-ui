import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chat, Message } from './types';

interface ChatStore {
  chats: Chat[];
  addChat: (title: string) => string;
  deleteChat: (id: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateChatTitle: (chatId: string, title: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chats: [],
      addChat: (title: string) => {
        const newChatId = Date.now().toString();
        set((state) => ({
          chats: [
            {
              id: newChatId,
              title,
              messages: [],
              timestamp: Date.now(),
              lastUpdated: Date.now(),
            },
            ...state.chats,
          ],
        }));
        return newChatId;
      },
      deleteChat: (id: string) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
        })),
      addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      ...message,
                      id: Date.now().toString(),
                      timestamp: Date.now(),
                    },
                  ],
                  lastUpdated: Date.now(),
                }
              : chat
          ),
        })),
      updateChatTitle: (chatId: string, title: string) =>
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
        })),
    }),
    {
      name: 'chat-storage',
    }
  )
); 