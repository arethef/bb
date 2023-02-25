export class ResMarketDetailTableTicketDto {
  ticket: {
    id: string;
    un: string;
    customer: {
      nickname: string;
    };
    totalQuantity: number;
    totalPrice: number;
  };
}
