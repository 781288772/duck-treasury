import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Request, UseGuards, HttpCode, Query} from '@nestjs/common';
import { GoldService } from './gold.service';
import { CreateGoldDto } from './dto/create-gold.dto';
import { UpdateGoldDto } from './dto/update-gold.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('gold')
export class GoldController {
  constructor(private readonly goldService: GoldService) {}

  @Post('create')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createGoldDto: CreateGoldDto, @Req() req) {
    return this.goldService.create(createGoldDto, req.user.userId);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() params) {
    return this.goldService.findAll(params);
  }

  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.goldService.findOne(id);
  }

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  update( @Body() updateGoldDto: UpdateGoldDto) {
    return this.goldService.update( updateGoldDto);
  }

  @HttpCode(200)
  @Post('remove')
  remove(@Query('id') id: number) {
    return this.goldService.remove(id);
  }
}
