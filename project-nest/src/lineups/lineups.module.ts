import { Module } from '@nestjs/common';
import { LineupsService } from './lineups.service';
import { LineupsController } from './lineups.controller';

@Module({
  controllers: [LineupsController],
  providers: [LineupsService]
})
export class LineupsModule {}
