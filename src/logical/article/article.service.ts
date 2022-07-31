import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize'; 
@Injectable()
export class ArticleService {
  async create(createArticleDto: CreateArticleDto, userId: string) {
    const sql = `INSERT INTO article
     (title, content, author, status)
      VALUES
       ('${createArticleDto.title}', '${createArticleDto.content}', '${userId}', 0)`;
    try {
      await sequelize.query(sql, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  async findAll(current: number, size: number, createTimeS: string, createTimeE: string) {
    console.log(createTimeS,
      createTimeE);
    let sql = `SELECT * FROM article`;
    if (createTimeS && createTimeE) {
      sql += ` WHERE create_time BETWEEN ${createTimeS} AND ${createTimeE}`;
    }
    sql += ` ORDER BY create_time DESC`;
    sql += ` LIMIT ${(current - 1) * size}, ${size}`;
    // const sql = `SELECT id,title,content,status,create_time FROM article WHERE create_time BETWEEN '2022-07-05 00:00:00' AND '2022-07-09 00:00:00' LIMIT ${current},${size}`;
    const total = await sequelize.query(`SELECT COUNT(*) FROM article`, { type: Sequelize.QueryTypes.SELECT, logging: false, raw: true});
    console.log(total);
    try {
      const list = await sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT, logging: false, raw: true});
      // 根据author查询用户名
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < list.length; i++) {
        const author = await sequelize.query(`SELECT real_name FROM admin_user WHERE user_id='${list[i].author}'`, { type: Sequelize.QueryTypes.SELECT, logging: false, raw: true});
        list[i].authorName = author[0].real_name;
      }
      return {
        code: 200,
        msg: 'Success',
        data: {
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
    const sql = `SELECT * FROM article WHERE id=${id}`;
    try {
    const detail = await  sequelize.query(sql, { logging: false });
    return {
      code: 200,
      msg: 'Success',
      data: detail[0][0]
    };
    } catch (err){
      return{
        code: 503,
        msg: `Service error: ${err}`
      };
    }
  }

  async update(updateArticleDto: UpdateArticleDto) {
    const sql =  `UPDATE article SET title = '${updateArticleDto.title}',content = '${updateArticleDto.content}' WHERE id=${updateArticleDto.id}`;
    try {
      await sequelize.query(sql, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
  }
}

  async remove(id: string) {
    const sql = `DELETE FROM article WHERE id=${id}`;
    try {
      await sequelize.query(sql, { logging: false });
      return {
        code: 200,
        msg: 'Success'
        };
    } catch (err) {
      return {
        code: 503,
        msg: `Service error: ${err}`
      };

    }
  }
}
