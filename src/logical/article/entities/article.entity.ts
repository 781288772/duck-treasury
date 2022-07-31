import { Column} from "sequelize-typescript";

export class Article {
    @Column({primaryKey: true, autoIncrement: false,allowNull: false, unique: true, comment: '文章id'})
    id: number;
    
    @Column({comment:'文章标题'})
    title: string;
    
    @Column
    content: string;

    @Column
    author: string;
     
    @Column
    status: number;

    @Column
    createTime: string;

    @Column
    updateTime: string;
    
    
}
