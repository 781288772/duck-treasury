import { Column } from "sequelize-typescript";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class CreateBannerDto {
 id: number;

 
 @ApiProperty()
 @IsNotEmpty({ message: '图片不能为空' })
src:string;

 create_time:string;

 update_time:string;

 is_hidden:boolean;
}
