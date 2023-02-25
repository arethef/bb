export class ResBrandProductDetailMarketDto {
  market: {
    id: string;
    un: string;
    title: string;
    openDateTime: Date;
    closeDateTime: Date;
  };
  totalNumberOfTickets: number;
  done: boolean;
}
