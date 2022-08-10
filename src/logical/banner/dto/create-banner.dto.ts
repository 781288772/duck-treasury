import { Column } from "sequelize-typescript";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateBannerDto {
 id: number;
 @IsNotEmpty({message:'图片不能为空'})
 src:string;
 create_time:string;
 update_time:string;
 is_hidden:boolean;
}
