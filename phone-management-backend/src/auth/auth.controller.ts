import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    console.log('this my login')
    console.log(createUserDto)

    return this.authService.login(createUserDto);
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
