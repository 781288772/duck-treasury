import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductonService } from './producton.service';
import { CreateProductonDto } from './dto/create-producton.dto';
import { UpdateProductonDto } from './dto/update-producton.dto';

@Controller('producton')
export class ProductonController {
  constructor(private readonly productonService: ProductonService) {}

  @Post()
  create(@Body() createProductonDto: CreateProductonDto) {
    return this.productonService.create(createProductonDto);
  }

  @Get()
  findAll() {
    return this.productonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductonDto: UpdateProductonDto) {
    return this.productonService.update(+id, updateProductonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productonService.remove(+id);
  }
}
