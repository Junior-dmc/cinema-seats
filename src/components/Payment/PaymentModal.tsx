import React, { useState } from 'react';
import { Movie } from '../../types';
import { PaymentService } from '../../services/PaymentService';
import { Ticket } from './Ticket';
import { useNotification } from '../../contexts/NotificationContext';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
  selectedSeats: string[];
  sessionTime: string;
  totalPrice: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  installments: boolean;
}

const paymentMethods: PaymentMethod[] = [
  { id: 'credit', name: 'Cartão de Crédito', icon: '💳', installments: true },
  { id: 'debit', name: 'Cartão de Débito', icon: '💳', installments: false },
  { id: 'pix', name: 'PIX', icon: '📱', installments: false },
];

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  movie,
  selectedSeats,
  sessionTime,
  totalPrice,
}) => {
  const { showNotification } = useNotification();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [installments, setInstallments] = useState<number>(1);
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCVV, setCardCVV] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [showTicket, setShowTicket] = useState<boolean>(false);
  const [currentTicketIndex, setCurrentTicketIndex] = useState<number>(0);

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
    }
    return numbers;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await PaymentService.processPayment({
        method: selectedMethod,
        amount: totalPrice,
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardName,
        cardExpiry,
        cardCVV,
        installments: selectedMethod === 'credit' ? installments : undefined,
      });

      if (response.success) {
        setTransactionId(response.transactionId || '');
        setPaymentSuccess(true);
        showNotification('success', 'Pagamento realizado com sucesso!');
        
        // Aguarda um momento antes de mostrar os ingressos
        setTimeout(() => {
          setShowTicket(true);
        }, 2000);
      } else {
        showNotification('error', response.message || 'Erro ao processar pagamento');
      }
    } catch (error) {
      showNotification('error', 'Erro ao processar pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNextTicket = () => {
    if (currentTicketIndex < selectedSeats.length - 1) {
      setCurrentTicketIndex(prev => prev + 1);
    }
  };

  const handlePreviousTicket = () => {
    if (currentTicketIndex > 0) {
      setCurrentTicketIndex(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Pagamento</h2>
        
        {showTicket ? (
          <div>
            <Ticket
              movie={movie}
              seat={selectedSeats[currentTicketIndex]}
              sessionTime={sessionTime}
              transactionId={transactionId}
            />
            {selectedSeats.length > 1 && (
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  onClick={handlePreviousTicket}
                  disabled={currentTicketIndex === 0}
                  className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-600"
                >
                  Anterior
                </button>
                <span className="text-white">
                  Ingresso {currentTicketIndex + 1} de {selectedSeats.length}
                </span>
                <button
                  onClick={handleNextTicket}
                  disabled={currentTicketIndex === selectedSeats.length - 1}
                  className="px-4 py-2 bg-purple-600 text-white rounded disabled:bg-gray-600"
                >
                  Próximo
                </button>
              </div>
            )}
          </div>
        ) : paymentSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h3 className="text-xl text-white mb-2">Pagamento Realizado com Sucesso!</h3>
            <p className="text-gray-400">Gerando seus ingressos...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-white mb-2">Resumo da Compra:</h3>
              <div className="bg-gray-700 rounded p-4">
                <p className="text-white">Filme: {movie.title}</p>
                <p className="text-gray-400">Sessão: {sessionTime}</p>
                <p className="text-gray-400">Assentos: {selectedSeats.join(', ')}</p>
                <p className="text-white font-bold mt-2">Total: R$ {totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white mb-2">Método de Pagamento:</h3>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    className={`p-4 rounded ${
                      selectedMethod === method.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="text-2xl mb-2">{method.icon}</div>
                    <div className="text-sm">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {selectedMethod && selectedMethod !== 'pix' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    className="w-full bg-gray-700 text-white rounded p-2"
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Nome no Cartão</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    className="w-full bg-gray-700 text-white rounded p-2"
                    placeholder="NOME COMPLETO"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Validade</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      className="w-full bg-gray-700 text-white rounded p-2"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">CVV</label>
                    <input
                      type="text"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      className="w-full bg-gray-700 text-white rounded p-2"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>

                {selectedMethod === 'credit' && (
                  <div>
                    <label className="block text-gray-400 mb-1">Parcelas</label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="w-full bg-gray-700 text-white rounded p-2"
                    >
                      {[...Array(12)].map((_, i) => {
                        const value = i + 1;
                        const installmentPrice = (totalPrice / value).toFixed(2);
                        return (
                          <option key={value} value={value}>
                            {value}x de R$ {installmentPrice}
                            {value === 1 ? ' (sem juros)' : ' (com juros)'}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            )}

            {selectedMethod === 'pix' && (
              <div className="text-center py-4">
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <QRCodeSVG
                    value={PaymentService.generatePixQRCode(totalPrice)}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-gray-400">
                  Escaneie o QR Code acima com seu aplicativo de pagamento
                </p>
              </div>
            )}

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing || !selectedMethod}
                className={`px-4 py-2 rounded ${
                  isProcessing || !selectedMethod
                    ? 'bg-gray-600 text-gray-400'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isProcessing ? 'Processando...' : 'Pagar Agora'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 