export type MessageRole = 'bot' | 'user';

export type MessageKind =
  | 'text'
  | 'correction'   // bot encontrou erros → exibe card de correção
  | 'approved'     // bot aprovou a resposta do usuário
  | 'options';     // bot exibe "Next question" / "Repeat"

export interface CorrectionData {
  original: string;
  errors: Array<{ type: 'grammar' | 'pronunciation'; detail: string }>;
  suggestion: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  kind: MessageKind;
  text?: string;
  isAudio?: boolean;
  correction?: CorrectionData;
  timestamp: Date;
}
