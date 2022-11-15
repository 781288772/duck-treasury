import { PartialType } from '@nestjs/swagger';
import { CreateProductonDto } from './create-producton.dto';

export class UpdateProductonDto extends PartialType(CreateProductonDto) {}
