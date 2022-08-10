import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpCode } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ValidationPipe } from '../../pipe/validation.pipe';
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('add')
  async create(@Body() CreateBannerDto: CreateBannerDto) {
    return await this.bannerService.create(CreateBannerDto);
  }

  @Get('list')
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}
