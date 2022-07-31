import { PartialType } from '@nestjs/swagger';
import { CreateGoldDto } from './create-gold.dto';

export class UpdateGoldDto extends PartialType(CreateGoldDto) {}
