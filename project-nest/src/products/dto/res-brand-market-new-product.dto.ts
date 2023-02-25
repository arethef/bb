import { Image } from 'src/images/entities/image.entity';

export class ResBrandMarketNewProductDto {
  product: {
    id: string;
    name: string;
    price: number;
    image: Image;
  };
}
