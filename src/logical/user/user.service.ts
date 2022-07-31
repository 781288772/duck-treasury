import { Body, Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import {v4 as uuid} from 'uuid'; // 引入 uuid 库
import { makeSalt, encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class UserService {
  /**
   * 删除
   * @param id
   * @returns
   */
  async remove(id: string): Promise<any> {
    const removeSql = `
     DELETE FROM admin_user WHERE user_id = '${id}'`;
    try {
      const result = await sequelize.query(removeSql, { type: Sequelize.QueryTypes.DELETE });
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

  /**
   *
   * @param body 修改
   * @returns
   */
  async update(@Body() body: any): Promise<any> {
    console.log(body);
    const { userId, accountName, realName, mobile, role } = body;
    const updateSQL = `
      UPDATE admin_user
      SET
        real_name = '${realName}',
        mobile = '${mobile}'
      WHERE
        user_id = '${userId}'`;
    try {
      await sequelize.query(updateSQL, { logging: false });
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
  /**
   *
   * @param current
   * @param size
   * @returns 列表查询
   */
  async list(current: number, size: number): Promise<any> {
    // 分页查询

    const sql = `SELECT user_id id, account_name username, real_name realName , mobile, role FROM admin_user LIMIT ${current},${size}`;
    const list =   await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT, // 查询方式
      raw: true, // 是否使用数组组装的方式展示结果
      logging: true, // 是否将 SQL 语句打印到控制台
    });
    // 获取列表总数
    const sql2 = `SELECT COUNT(*) FROM admin_user`;
    const total = await sequelize.query(sql2, {
      type: Sequelize.QueryTypes.SELECT, // 查询方式
      raw: true, // 是否使用数组组装的方式展示结果
      logging: true, // 是否将 SQL 语句打印到控制台
    });
    const res = {
    code: 200,
    data: list,
    total: total[0]['COUNT(*)'],
};
    return res ;
}

async getUserInfo(countName){
  const sql = `SELECT * FROM admin_user WHERE account_name = '${countName}'`; 
  const user = await sequelize.query(sql,{
    type: Sequelize.QueryTypes.SELECT, // 查询方式
    raw: false, // 是否使用数组组装的方式展示结果
    logging: true, // 是否将 SQL 语句打印到控制台
  });
  
  console.log(user[0]);

  const res = {
    code: 200,
    type: 'success',
    result: {
     userId: user[0].user_id,
     realName: user[0].real_name,
     username: user[0].account_name,
     desc: 'manager',
     homePath: '/dashboard/analysis',
       roles: [
         {
           roleName: 'Super Admin',
           value: 'super',
         },
       ],
     }
 }
  return res;
}
  /**
   * 查询是否有该用户
   * @param username 用户名
   */
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id id, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: false, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      // 若查不到用户，则 user === undefined
      return user;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);
    console.log('user:', user);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    const registerSQL = `
      INSERT INTO admin_user
        (user_id,account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${uuid()}','${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
    try {
      await sequelize.query(registerSQL, { logging: false });
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
}
