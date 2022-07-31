import { Controller, Get, Body, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth  } from '@nestjs/swagger';
import multer = require('multer');
 
@ApiBearerAuth() // Swagger 的 JWT 验证
@ApiTags('demo')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: any ) {}
  /**
   * 上传图片到 本地 和 oss
   * @param body 
   */
  @Post('info/uploadImage')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "D:/oss/image");
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  async uploadImage(@UploadedFile() file: any): Promise<any> {
    return await this.demoService.uploadImage(file)
  }
 
}