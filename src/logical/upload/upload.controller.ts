// 1.依赖引入 UseInterceptors, UploadedFile, FileInterceptor
import { Controller, Get, Post, Render, Body, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// 3.将上传的图片放到某个文件夹
import { createWriteStream } from 'fs';
import { join } from 'path';

@Controller('upload')
export class UploadController {
    @Get() 
    @Render('default/upload')
    index(){}

    @Post('doAdd')
    // 2.使用
    // 注意：必须在form的属性中配置enctype="multipart/form-data"
    @UseInterceptors(FileInterceptor('file')) // 配置上传图片的名称
    @HttpCode(200)
    doAdd(@Body() body, @UploadedFile() file) {
        console.log('==========================', file.mimetype);
        if(!file){
            return {
                code: 400,
                msg: '上传失败'
            }
        }
        // 判断文件类型是否为jpg或png
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            return {
                code: 400,
                msg: '上传文件类型不正确'
            }
            }
        console.log('文件: ', file);
        console.log('body: ', body);
        console.log('__dirname: ', __dirname);
        // 4.将上传的图片放到某个文件夹
        var writeStream = createWriteStream(join(__dirname, '../../../../src/public/upload', `${Date.now()}-${file.originalname}`))
         writeStream.write( file.buffer);
      
        return {
            code: 200,
            msg: '上传成功',
            url: `/${Date.now()}-${file.originalname}`,
             };
    }
}
