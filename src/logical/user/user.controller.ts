import { Controller, Post, Body,Get, UseGuards, UsePipes, Query, HttpCode, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { LoginDTO, RegisterInfoDTO } from './user.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService, private readonly usersService: UserService) {}

 @Post('remove')
 @HttpCode(200)
 @UseGuards(AuthGuard('jwt'))
  async remove(@Body() body: any) {
    const { id } = body;
    return await this.usersService.remove(id);
  }


  @Post('update')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() body: any) {
    return await this.usersService.update(body);
  }

  @Get('getUserInfo')
  async getUserInfo(@Query()query: any) {
    return await this.usersService.getUserInfo(query.username);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async list(@Query() query: any) {
    return await this.usersService.list(query.current,query.size);
  }

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  @HttpCode(200)
  async login(@Body() loginParams: LoginDTO) {
    // console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParams.username, loginParams.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.usersService.register(body);
  }
}
