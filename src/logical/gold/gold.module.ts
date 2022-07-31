import { Module } from '@nestjs/common';
import { GoldService } from './gold.service';
import { GoldController } from './gold.controller';

@Module({
  controllers: [GoldController],
  providers: [GoldService]
})
export class GoldModule {}
