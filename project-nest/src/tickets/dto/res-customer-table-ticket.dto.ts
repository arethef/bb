export class ResCustomerTableTicketDto {
  ticket: {
    id: string;
    un: string;
    createdAt: Date;
    brand: {
      businessName: string;
    };
    market: {
      title: string;
    };
    totalQuantity: number;
    totalPrice: number;
    deliveryStatus: string;
  };
}
