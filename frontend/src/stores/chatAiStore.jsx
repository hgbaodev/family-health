import { create } from 'zustand';

export const useChatAiStore = create((set) => ({
  messages: [
    { sender: 'ai', text: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  ],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
}));