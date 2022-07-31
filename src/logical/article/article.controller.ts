import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createArticleDto: CreateArticleDto,@Req() req:any) {
    return this.articleService.create(createArticleDto,req.user.userId);
  }

  @Get('list')
  findAll(@Query()query) {
    return this.articleService.findAll(query.current, query.size, query.createTimeS, query.createTimeE);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Post('update')
  update(@Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update( updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
