import { Column } from "sequelize-typescript";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateGoldDto {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;
    @IsNotEmpty({message: '名称不能为空'})
    @Column
    name: string;
    @IsNotEmpty({message: '单价不能为空'})
    @Column
    unitPrice: number;
    @IsNotEmpty({message: '描述不能为空'})
    @Column
    description: string;
    @IsNotEmpty({message: '图片不能为空'})
    @Column
    img: string;
    @IsNotEmpty({message: '类型不能为空'})
    @Column
    type: string;
    @IsNotEmpty({message: '重量不能为空'})
    @Column
    weight: number;
    @Column
    createTime: string;
    @Column
    updateTime: string;
    @Column
    createBy: string;

}
