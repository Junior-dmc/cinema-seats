export type SeatStatus = "available" | "occupied" | "selected" | "vip" | "premium";

export interface SeatInfo {
  id: string;
  status: SeatStatus;
  section: "left" | "main" | "right" | null;
}

export interface Sessao {
  id: number;
  horario: string;
  sala: number;
  tipo: string;
  idioma: string;
}

export interface Filme {
  id: number;
  titulo: string;
  imagem: string;
  duracao: string;
  classificacao: string;
  generos: string[];
  sinopse: string;
  sessoes: Sessao[];
}

export interface FilmeEstreia {
  id: number;
  titulo: string;
  imagem: string;
  dataEstreia: string;
  classificacao: string;
  generos: string[];
  sinopse: string;
}

export interface ProximaEstreia {
  id: number;
  titulo: string;
  imagem: string;
  dataEstreia: string;
  duracao: string;
  classificacao: string;
  generos: string[];
  sinopse: string;
}

export interface NotificationContextType {
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
}

export interface NotificationType {
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface Movie {
  id: number;
  title: string;
  duration: number;
  ageRating: number;
  genres: string[];
  imageUrl: string;
  description: string;
  releaseDate?: string;
}

export interface MovieSession extends Movie {
  date: string;
  time: string;
  room: string;
  price: number;
  type: '2D' | '3D' | 'IMAX';
}

export interface UpcomingMovie extends Movie {
  releaseDate: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  preferences: UserPreferences;
  purchaseHistory: PurchaseHistory[];
}

export interface UserPreferences {
  favoriteGenres: string[];
  preferredSeatingArea: 'front' | 'middle' | 'back';
  preferredShowtimes: string[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export type ReservationStatus = 'active' | 'completed' | 'cancelled' | 'expired';

export interface PurchaseHistory {
  id: string;
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  sessionDate: string;
  sessionTime: string;
  seats: string[];
  totalAmount: number;
  purchaseDate: string;
  paymentMethod: string;
  status: ReservationStatus;
  room: string;
  qrCode?: string;
  rating?: number;
  comment?: string;
  cancellationReason?: string;
} 