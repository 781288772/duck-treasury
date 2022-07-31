import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
    id:string;
    
    @IsNotEmpty({message:'文章标题不能为空'})
    title: string;
    
    @IsNotEmpty({message:'文章内容不能为空'})
    content: string;

 
    author: string;
     
    status: number;

   
    createTime: string;

   
    updateTime: string;
}
