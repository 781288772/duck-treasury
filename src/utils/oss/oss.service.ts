import { Injectable } from '@nestjs/common';
import { OssService } from './oss.main'
 
@Injectable()
export class DemoService {
  constructor(private readonly ossService:OssService) {}
  // 上传照片
  async uploadImage(file: any): Promise<any> {
    try {
      const ossUrl = await this.ossService.putOssFile(`/image/${file.originalname}`,`D:/oss/image/${file.originalname}`)
      return {
        code: 200,
        data: ossUrl,
        message: '上传成功'
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}