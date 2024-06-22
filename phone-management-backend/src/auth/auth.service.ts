import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    try {
  
        // Validate the user's credentials (username and password)
        const myUser = await this.validateUser(user.username, user.password);
  
        // If user is not found or credentials are incorrect
        if (!myUser) {
          throw new UnauthorizedException('Invalid credentials'); // Throw UnauthorizedException
        }
  
        // Create the JWT payload with the username and user ID
        const payload = { username: myUser.username, sub: myUser.id };
  
        // Return a successful response with the JWT access token
        return {
          status: HttpStatus.OK, // HTTP status 200
          message: 'Login successful', // Success message
          data: {
            access_token: this.jwtService.sign(payload), // Generate JWT token
          },
        };
      } catch (error) {
        // Handle specific errors for invalid credentials
        if (error instanceof UnauthorizedException) {
          throw new HttpException({
            status: HttpStatus.UNAUTHORIZED, // HTTP status 401
            message: error.message, // Specific error message
          }, HttpStatus.UNAUTHORIZED);
        }
  
        // Handle other generic errors
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR, // HTTP status 500
          message: 'An error occurred during login', // Generic error message
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }
}
