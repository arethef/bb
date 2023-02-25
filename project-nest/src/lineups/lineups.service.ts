import { Injectable } from '@nestjs/common';
import { Market } from 'src/markets/entities/market.entity';
import { Product } from 'src/products/entities/product.entity';
import { ReqCreateLineupsDto } from './dto/req-create-lineups.dto';
import { Lineup } from './entities/lineup.entity';

@Injectable()
export class LineupsService {
  async createLineups(dto: ReqCreateLineupsDto) {
    const market: Market = await Market.findOne({
      where: { id: dto.marketId },
    });
    const result: Lineup[] = [];
    for (const key of Object.keys(dto.lineups)) {
      const product: Product = await Product.findOne({
        where: { id: key },
      });
      const lineup: Lineup = new Lineup();
      lineup.market = market;
      lineup.product = product;
      lineup.quantity = dto.lineups[key];
      result.push(await Lineup.save(lineup));
    }
    return result;
  }

  async findLineupsByMarketId(marketId: string) {
    const lineups: Lineup[] = await Lineup.find({
      where: { marketId },
    });
    return lineups;
  }
}
