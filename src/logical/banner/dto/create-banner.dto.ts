import { Column } from "sequelize-typescript";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateBannerDto {
 @Column({ primaryKey: true, autoIncrement: true })
 id: number;
 @Column
 src:string;
 @Column
 create_time:string;
 @Column
 update_time:string;
 @Column({ defaultValue:0 })
 is_hidden:boolean;
}
