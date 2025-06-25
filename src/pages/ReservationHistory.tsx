import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { useNotification } from '../contexts/NotificationContext';
import type { PurchaseHistory, ReservationStatus } from '../types';
import { QRCodeSVG } from 'qrcode.react';

const ReservationHistory: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [filter, setFilter] = useState<ReservationStatus | 'all'>('all');
  const [selectedReservation, setSelectedReservation] = useState<PurchaseHistory | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [showRatingModal, setShowRatingModal] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const filteredHistory = user.purchaseHistory.filter(
    (purchase) => filter === 'all' || purchase.status === filter
  );

  const handleCancelReservation = async (reservationId: string) => {
    if (!user) return;

    const updatedHistory = user.purchaseHistory.map((purchase) =>
      purchase.id === reservationId
        ? { ...purchase, status: 'cancelled' as ReservationStatus }
        : purchase
    );

    try {
      await updateProfile({ ...user, purchaseHistory: updatedHistory });
      showNotification('success', 'Reserva cancelada com sucesso!');
    } catch (error) {
      showNotification('error', 'Erro ao cancelar reserva. Tente novamente.');
    }
  };

  const handleRateReservation = async () => {
    if (!user || !selectedReservation) return;

    const updatedHistory = user.purchaseHistory.map((purchase) =>
      purchase.id === selectedReservation.id
        ? { ...purchase, rating, comment }
        : purchase
    );

    try {
      await updateProfile({ ...user, purchaseHistory: updatedHistory });
      showNotification('success', 'Avaliação enviada com sucesso!');
      setShowRatingModal(false);
      setSelectedReservation(null);
      setRating(0);
      setComment('');
    } catch (error) {
      showNotification('error', 'Erro ao enviar avaliação. Tente novamente.');
    }
  };

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'completed':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      case 'expired':
        return 'text-gray-500';
      default:
        return 'text-gray-300';
    }
  };

  const getStatusText = (status: ReservationStatus) => {
    switch (status) {
      case 'active':
        return 'Ativa';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      case 'expired':
        return 'Expirada';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Histórico de Reservas</h2>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as ReservationStatus | 'all')}
                className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600"
              >
                <option value="all">Todas</option>
                <option value="active">Ativas</option>
                <option value="completed">Concluídas</option>
                <option value="cancelled">Canceladas</option>
                <option value="expired">Expiradas</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {filteredHistory.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-gray-700 rounded-lg p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="w-full md:w-1/4">
                  <img
                    src={purchase.moviePoster}
                    alt={purchase.movieTitle}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {purchase.movieTitle}
                      </h3>
                      <p className="text-gray-300">
                        {purchase.sessionDate} às {purchase.sessionTime}
                      </p>
                      <p className="text-gray-300">Sala: {purchase.room}</p>
                      <p className="text-gray-300">
                        Assentos: {purchase.seats.join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium text-white">
                        R$ {purchase.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-gray-300">{purchase.paymentMethod}</p>
                      <p className={`font-medium ${getStatusColor(purchase.status)}`}>
                        {getStatusText(purchase.status)}
                      </p>
                    </div>
                  </div>

                  {purchase.status === 'active' && (
                    <div className="flex gap-4 mt-4">
                      <Button
                        onClick={() => handleCancelReservation(purchase.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Cancelar Reserva
                      </Button>
                      {purchase.qrCode && (
                        <div className="bg-white p-2 rounded-lg">
                          <QRCodeSVG value={purchase.qrCode} size={100} />
                        </div>
                      )}
                    </div>
                  )}

                  {purchase.status === 'completed' && !purchase.rating && (
                    <Button
                      onClick={() => {
                        setSelectedReservation(purchase);
                        setShowRatingModal(true);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 mt-4"
                    >
                      Avaliar
                    </Button>
                  )}

                  {purchase.rating && (
                    <div className="mt-4">
                      <p className="text-gray-300">
                        Avaliação: {'⭐'.repeat(purchase.rating)}
                      </p>
                      {purchase.comment && (
                        <p className="text-gray-300 mt-2">{purchase.comment}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredHistory.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  Nenhuma reserva encontrada para os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Avaliação */}
      {showRatingModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              Avaliar {selectedReservation.movieTitle}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Avaliação
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-500'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Comentário
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  onClick={() => {
                    setShowRatingModal(false);
                    setSelectedReservation(null);
                    setRating(0);
                    setComment('');
                  }}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleRateReservation}
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={rating === 0}
                >
                  Enviar Avaliação
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationHistory; 