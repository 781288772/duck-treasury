import { Column } from "sequelize-typescript";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class CreateBannerDto {
    // id
 id: number;

 
//  图片路径
 @ApiProperty()
 @IsNotEmpty({ message: '图片不能为空' })
 src:string;

 //创建时间
 create_time:string;
// 更新时间
 update_time:string;

 is_hidden:boolean;
}
