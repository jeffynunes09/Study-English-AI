import { create } from 'zustand';
import { ChatService, SendMessageResponse } from '../services/chat.service';
import { Message } from '../components/chat/types';

interface ChatState {
  sessionId: string | null;
  messages: Message[];
  isTyping: boolean;
  phase: 'idle' | 'level-check' | 'awaiting-reply' | 'correction' | 'approved';

  startSession: () => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  sendAudio: () => Promise<void>;
  reset: () => void;
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

function botMessage(text: string, kind: Message['kind'] = 'text', correction?: Message['correction']): Message {
  return { id: makeId(), role: 'bot', kind, text, correction, timestamp: new Date() };
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessionId: null,
  messages: [],
  isTyping: false,
  phase: 'idle',

  startSession: async () => {
    set({ messages: [], isTyping: true, phase: 'level-check' });
    try {
      const { sessionId, message } = await ChatService.startSession();
      set({
        sessionId,
        messages: [botMessage(message)],
        phase: 'awaiting-reply',
      });
    } finally {
      set({ isTyping: false });
    }
  },

  sendMessage: async (text: string) => {
    const { sessionId, messages } = get();
    if (!sessionId) return;

    // Adiciona mensagem do usuário imediatamente
    const userMsg: Message = { id: makeId(), role: 'user', kind: 'text', text, timestamp: new Date() };
    set({ messages: [...messages, userMsg], isTyping: true });

    try {
      const response: SendMessageResponse = await ChatService.sendMessage(sessionId, text);

      const newMessages: Message[] = [];

      if (response.correction?.hasErrors) {
        // Card de correção
        newMessages.push({
          id: makeId(),
          role: 'bot',
          kind: 'correction',
          correction: {
            original: text,
            errors: response.correction.errors,
            suggestion: response.correction.suggestion,
          },
          timestamp: new Date(),
        });
        // Mensagem de encorajamento
        newMessages.push(botMessage(response.message));
        set({ phase: 'correction' });
      } else if (response.phase === 'approved') {
        newMessages.push(botMessage(response.message, 'approved'));
        newMessages.push({ id: makeId(), role: 'bot', kind: 'options', timestamp: new Date() });
        set({ phase: 'approved' });
      } else {
        newMessages.push(botMessage(response.message));
        set({ phase: 'awaiting-reply' });
      }

      set({ messages: [...get().messages, ...newMessages] });
    } catch (err) {
      const error = err as Error;
      set({
        messages: [
          ...get().messages,
          botMessage(`⚠️ ${error.message ?? 'Connection error. Please try again.'}`),
        ],
      });
    } finally {
      set({ isTyping: false });
    }
  },

  sendAudio: async () => {
    // Placeholder — será implementado com expo-av na integração de STT
    const audioMsg: Message = {
      id: makeId(),
      role: 'user',
      kind: 'text',
      isAudio: true,
      timestamp: new Date(),
    };
    set({ messages: [...get().messages, audioMsg] });
    // TODO: transcrever via ChatService.sendAudio() quando endpoint de STT estiver pronto
  },

  reset: () => set({ sessionId: null, messages: [], phase: 'idle', isTyping: false }),
}));
