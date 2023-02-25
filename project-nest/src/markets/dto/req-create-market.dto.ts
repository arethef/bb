export class ReqCreateMarketDto {
  market: {
    title: string;
    content: string;
    deliveryFee: number;
    deliveryFeeAdded: number;
    deliveryFree: number;
    minimumQuantity: number;
    openDate: string;
    openTime: string;
    closeDate: string;
    closeTime: string;
  };
  image: {
    id: string;
  };
}
