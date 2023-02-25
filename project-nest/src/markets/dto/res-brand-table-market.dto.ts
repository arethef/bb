export class ResBrandTableMarketDto {
  market: {
    id: string;
    un: string;
    title: string;
    openDateTime: Date;
    closeDateTime: Date;
  };
  totalNumberOfPreparations: number;
  totalPriceSoldOut: number;
  totalNumberOfSales: number;
  totalPriceSelling: number;
  totalNumberOfTickets: number;
  done: boolean;
}
