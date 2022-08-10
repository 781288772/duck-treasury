import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class BannerService {
  async create(createBannerDto: CreateBannerDto) {
    if(!createBannerDto.src){
      return{
        code:400,
        result:{
          msg:'图片不能为空',
          success:false,
        }
      }
    }
    const sql =`INSERT INTO banner (src) VALUES('${createBannerDto.src}')`;
    try{
    await sequelize.query(sql, { logging: false});
   
      return {
        code: 200,
        result:{
          success:true,
          msg:'操作成功'

        }
      }
    
    }catch(err){
      return {
        code: 503,
        result:{
          success:false,
         msg:`Service error: ${err}`
    }
  }

}
  
   
    
  }

  findAll() {
    return `This action returns all banner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banner`;
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
