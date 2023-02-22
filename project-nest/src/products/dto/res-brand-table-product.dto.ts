export class ResBrandTableProductDto {
  product: {
    id: string;
    un: string;
    name: string;
    price: number;
  };
  totalNumberOfMarkets: number;
  totalNumberOfSales: number;
  openDateTimeOfLastMarket: Date | null;

  // public setProduct(id: string, un: string, name: string, price: number) {
  //   this.product.id = id;
  //   this.product.un = un;
  //   this.product.name = name;
  //   this.product.price = price;
  // }
  // public setTotalNumberOfMarkets(totalNumberOfMarkets: number) {
  //   this.totalNumberOfMarkets = totalNumberOfMarkets;
  // }
  // public setTotalNumberOfSales(totalNumberOfSales: number) {
  //   this.totalNumberOfSales = totalNumberOfSales;
  // }
  // public setOpenDateTimeOfLastMarket(openDateTimeOfLastMarket: Date) {
  //   this.openDateTimeOfLastMarket = openDateTimeOfLastMarket;
  // }
}
