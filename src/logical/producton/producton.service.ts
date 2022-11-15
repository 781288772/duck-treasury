import { Injectable } from '@nestjs/common';
import { CreateProductonDto } from './dto/create-producton.dto';
import { UpdateProductonDto } from './dto/update-producton.dto';

@Injectable()
export class ProductonService {
  create(createProductonDto: CreateProductonDto) {
    return 'This action adds a new producton';
  }

  findAll() {
    return `This action returns all producton`;
  }

  findOne(id: number) {
    return `This action returns a #${id} producton`;
  }

  update(id: number, updateProductonDto: UpdateProductonDto) {
    return `This action updates a #${id} producton`;
  }

  remove(id: number) {
    return `This action removes a #${id} producton`;
  }
}
