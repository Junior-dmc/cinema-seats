interface PaymentData {
  method: string;
  amount: number;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCVV?: string;
  installments?: number;
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
}

export class PaymentService {
  static async processPayment(data: PaymentData): Promise<PaymentResponse> {
    // Simulando uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Validações básicas
    if (data.method === 'credit' || data.method === 'debit') {
      if (!data.cardNumber || !data.cardName || !data.cardExpiry || !data.cardCVV) {
        return {
          success: false,
          message: 'Dados do cartão incompletos'
        };
      }

      // Validação do número do cartão (Luhn algorithm)
      if (!this.validateCardNumber(data.cardNumber.replace(/\s/g, ''))) {
        return {
          success: false,
          message: 'Número do cartão inválido'
        };
      }
    }

    // Simulando uma resposta de sucesso
    return {
      success: true,
      transactionId: Math.random().toString(36).substring(2, 15),
      message: 'Pagamento processado com sucesso'
    };
  }

  private static validateCardNumber(number: string): boolean {
    let sum = 0;
    let isEven = false;

    // Algoritmo de Luhn para validação do cartão
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  static generatePixQRCode(amount: number): string {
    // Simulando geração de QR Code do PIX
    return `00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000${amount.toFixed(2)}5204000053039865802BR5913Cinema Tickets6008Sao Paulo62070503***63041234`;
  }

  static async validatePixPayment(transactionId: string): Promise<boolean> {
    // Simulando verificação de pagamento PIX
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.random() > 0.2; // 80% de chance de sucesso
  }
} 