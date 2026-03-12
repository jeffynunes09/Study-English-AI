import { api } from './api';

export interface CorrectionError {
  type: 'grammar' | 'pronunciation';
  detail: string;
}

export interface CorrectionData {
  hasErrors: boolean;
  errors: CorrectionError[];
  suggestion: string;
  encouragement: string;
}

export interface SendMessageResponse {
  message: string;
  correction?: CorrectionData;
  phase: 'correction' | 'approved' | 'question';
  fromCache?: boolean;
}

export interface HistoryMessage {
  _id: string;
  role: 'user' | 'assistant';
  kind: 'text' | 'audio' | 'correction' | 'approved';
  text?: string;
  audioUrl?: string;
  correction?: {
    original: string;
    errors: CorrectionError[];
    suggestion: string;
  };
  createdAt: string;
}

export const ChatService = {
  async startSession(): Promise<{ sessionId: string; message: string }> {
    const { data } = await api.post('/chat/session');
    return data;
  },

  async sendMessage(sessionId: string, text: string): Promise<SendMessageResponse> {
    const { data } = await api.post(`/chat/session/${sessionId}/message`, { text });
    return data;
  },

  async getHistory(sessionId: string): Promise<HistoryMessage[]> {
    const { data } = await api.get(`/chat/session/${sessionId}/history`);
    return data.messages;
  },
};
