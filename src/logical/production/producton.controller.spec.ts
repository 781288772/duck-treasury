import { Test, TestingModule } from '@nestjs/testing';
import { ProductonController } from './producton.controller';
import { ProductionService } from './production.service';

describe('ProductonController', () => {
  let controller: ProductonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductonController],
      providers: [ProductionService],
    }).compile();

    controller = module.get<ProductonController>(ProductonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
