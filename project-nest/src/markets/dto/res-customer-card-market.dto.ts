export class ResCustomerCardMarketDto {
  market: {
    id: string;
    title: string;
    closeDateTime: Date;
    brand: {
      businessName: string;
    };
    image: {
      url: string;
    };
  };
}
