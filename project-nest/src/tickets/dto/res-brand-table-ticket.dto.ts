export class ResBrandTableTicketDto {
  ticket: {
    id: string;
    un: string;
    createdAt: Date;
    customer: {
      nickname: string;
    };
    totalQuantity: number;
    totalPrice: number;
    deliveryStatus: string;
  };
}
