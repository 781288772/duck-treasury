import { Module } from '@nestjs/common';
import { ProductonService } from './producton.service';
import { ProductonController } from './producton.controller';

@Module({
  controllers: [ProductonController],
  providers: [ProductonService]
})
export class ProductonModule {}
