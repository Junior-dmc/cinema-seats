import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ReservationStatus } from '../types';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'purchaseHistory'>) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mockPurchaseHistory = [
  {
    id: '1',
    movieId: 1,
    movieTitle: 'Duna: Parte 2',
    moviePoster: '/images/movies/Duna Parte 2.jpg',
    sessionDate: '2024-03-20',
    sessionTime: '19:00',
    seats: ['A1', 'A2'],
    totalAmount: 60.00,
    purchaseDate: '2024-03-15',
    paymentMethod: 'Cartão de Crédito',
    status: 'active' as ReservationStatus,
    room: 'Sala 1',
    qrCode: 'CINEMA-1-A1A2-123456',
  },
  {
    id: '2',
    movieId: 2,
    movieTitle: 'Pobres Criaturas',
    moviePoster: '/images/movies/Pobres Criaturas.jpg',
    sessionDate: '2024-03-10',
    sessionTime: '21:00',
    seats: ['C5'],
    totalAmount: 30.00,
    purchaseDate: '2024-03-05',
    paymentMethod: 'PIX',
    status: 'completed' as ReservationStatus,
    room: 'Sala 2',
    rating: 5,
    comment: 'Filme incrível! Recomendo muito!',
  },
  {
    id: '3',
    movieId: 3,
    movieTitle: 'Bob Marley: One Love',
    moviePoster: '/images/movies/Bob Marley One Love.jpg',
    sessionDate: '2024-03-18',
    sessionTime: '15:30',
    seats: ['F12', 'F13'],
    totalAmount: 50.00,
    purchaseDate: '2024-03-16',
    paymentMethod: 'Cartão de Débito',
    status: 'cancelled' as ReservationStatus,
    room: 'Sala 3',
    cancellationReason: 'Imprevisto pessoal',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    // Carregar usuário do localStorage ao iniciar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simular uma chamada de API
      const mockUser: User = {
        id: '1',
        name: 'Usuário Teste',
        email: email,
        password: password, // Em uma aplicação real, nunca armazenar a senha em texto puro
        preferences: {
          favoriteGenres: ['Ação', 'Aventura', 'Ficção Científica'],
          preferredSeatingArea: 'middle',
          preferredShowtimes: ['19:00', '21:00'],
          notificationPreferences: {
            email: true,
            push: true,
            sms: false,
          },
        },
        purchaseHistory: mockPurchaseHistory,
      };

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      showNotification('success', 'Login realizado com sucesso!');
    } catch (error) {
      showNotification('error', 'Erro ao fazer login. Tente novamente.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'purchaseHistory'>) => {
    try {
      setIsLoading(true);
      // Simular uma chamada de API
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        purchaseHistory: mockPurchaseHistory, // Adicionando histórico mock para demonstração
      };

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      showNotification('success', 'Cadastro realizado com sucesso!');
    } catch (error) {
      showNotification('error', 'Erro ao criar conta. Tente novamente.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    showNotification('success', 'Logout realizado com sucesso!');
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      if (!user) throw new Error('Usuário não encontrado');

      // Simular uma chamada de API
      const updatedUser: User = {
        ...user,
        ...userData,
      };

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      showNotification('success', 'Perfil atualizado com sucesso!');
    } catch (error) {
      showNotification('error', 'Erro ao atualizar perfil. Tente novamente.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 