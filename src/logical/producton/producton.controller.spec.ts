import { Test, TestingModule } from '@nestjs/testing';
import { ProductonController } from './producton.controller';
import { ProductonService } from './producton.service';

describe('ProductonController', () => {
  let controller: ProductonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductonController],
      providers: [ProductonService],
    }).compile();

    controller = module.get<ProductonController>(ProductonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
