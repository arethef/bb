export class ReqCreateTicketDto {
  ticket: {
    // brandId: string;
    marketId: string;
    totalQuantity: number;
    totalPrice: number;
    deliveryFreeApply: boolean;
    deliveryAddress: string;
  };
}
