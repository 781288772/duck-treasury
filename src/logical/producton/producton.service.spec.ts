import { Test, TestingModule } from '@nestjs/testing';
import { ProductonService } from './producton.service';

describe('ProductonService', () => {
  let service: ProductonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductonService],
    }).compile();

    service = module.get<ProductonService>(ProductonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
