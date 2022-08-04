import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './logical/user/user.service';
import { UserController } from './logical/user/user.controller';
import { UserModule } from './logical/user/user.module';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';
import { UploadService } from './logical/upload/upload.service';
import { UploadController } from './logical/upload/upload.controller';
import { ArticleModule } from './logical/article/article.module';
import { GoldModule } from './logical/gold/gold.module';
import { BannerModule } from './logical/banner/banner.module';

@Module({
  imports: [UserModule, AuthModule, ArticleModule, GoldModule, BannerModule],
  controllers: [AppController, UserController, CommodityController, UploadController],
  providers: [AppService, CommodityService, UploadService],
})
export class AppModule {}
