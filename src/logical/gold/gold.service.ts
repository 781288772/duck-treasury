import { HttpCode, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateGoldDto } from './dto/create-gold.dto';
import { UpdateGoldDto } from './dto/update-gold.dto';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class GoldService {
  async create(createGoldDto: CreateGoldDto, userId: string) {
    const sql = `INSERT INTO gold (name,unit_price,price,weight,description,img,type,create_by)
     VALUES('${createGoldDto.name}','${createGoldDto.unitPrice}','${createGoldDto.unitPrice * createGoldDto.weight}','${createGoldDto.weight}','${createGoldDto.description}','${createGoldDto.img}','${createGoldDto.type}','${userId}')`;
    try {
      await sequelize.query(sql, { logging: false});
      return {
        code: 200,
        msg: 'Success',
        result: {
          success: true,
        }
      };
     } catch (err) {
      return {
        code: 503,
        msg: `Service error: ${err}`,
        result: {
          msg: `Service error: ${err}`,
        }
      };
     }
  }

  async findAll(params: any) {
    const { current, size, createTimeS, createTimeE } = params;
    let sql = ` SELECT id,name,weight,type,unit_price,price,img,description,create_by,DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime FROM gold`;
    if (createTimeS && createTimeE) {
      sql += ` WHERE create_time BETWEEN '${createTimeS}' AND '${createTimeE}'`;
    }
    sql += ` LIMIT ${(current - 1) * size},${size}`;
    try {
      const list = await sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, logging: false, raw: true});
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < list.length; i++) {
      const user = await sequelize.query(`SELECT real_name FROM admin_user WHERE user_id = '${list[i].create_by}'`, {type: Sequelize.QueryTypes.SELECT, logging: false, raw: true});
      list[i].createUserName = user[0].real_name;
      }
      const total = await sequelize.query(`SELECT COUNT(*) FROM gold`, { type: Sequelize.QueryTypes.SELECT, logging: false, raw: true});
      return {
        code: 200,
        msg: 'Success',
        result: {
          list,
          total: total[0]['COUNT(*)']
        }
      };
    } catch (err) {
      return {
        code: 503,
        msg: `Service error: ${err}`
      };
    }
  }

    async findOne(id: number) {
      const sql = `SELECT id,name,weight,type,price,unit_price as unitPrice,img,description,create_time as createTime FROM gold WHERE id = ${id}`;
      try {
     const result = await sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT, logging: false, raw: false});
     return {
        code: 200,
        msg: 'Success',
        result: result[0]
      };

     } catch (err) {
        return {
          code: 503,
          msg: `Service error: ${err}`,
        };
     }

  }

     async update(updateGoldDto: UpdateGoldDto) {
    const sql = `UPDATE gold SET
    name = '${updateGoldDto.name}',
    unit_price = ${updateGoldDto.unitPrice},
    price = ${updateGoldDto.unitPrice * updateGoldDto.weight},
    weight = ${updateGoldDto.weight},
    description = '${updateGoldDto.description}',
    img = '${updateGoldDto.img}',
    type =' ${updateGoldDto.type}' WHERE id=${updateGoldDto.id}`;
    try {
      sequelize.query(sql, { logging: false });
      return {
        code: 200,
        msg: 'Success',
        result: {
          success: true,
        }
      };
    } catch (error) {
      return {
        code: 503,
        result: {
          msg: `Service error: ${error}`,
          success: false
        }
      };
    }
  }

      async remove(id: number) {
    const sql = `DELETE FROM gold WHERE id=${id}`;
    try {
     await sequelize.query(sql, { logging: false });
     return {
        code: 200,
        msg: 'Success',
        result: {
          success: true,
        }
      };
    } catch (err) {
      return {
        code: 503,
        result: {
          success: false,
          msg: `Service error: ${err}`,
        }
      };
    }
  }
}
