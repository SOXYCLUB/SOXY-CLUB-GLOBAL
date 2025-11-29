export interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  variant: 'men' | 'women' | 'family';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}