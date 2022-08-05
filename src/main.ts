import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
// 静态资源访问
  app.useStaticAssets(join(__dirname, '../..', 'src/public/upload'),{
  prefix: '/static',  // 设置虚拟路径
});
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  // 使用拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest zero to one')
    .setDescription('The nest-zero-to-one API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
