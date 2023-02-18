import { Controller } from '@nestjs/common';
import { LineupsService } from './lineups.service';

@Controller('lineups')
export class LineupsController {
  constructor(private readonly lineupsService: LineupsService) {}
}
