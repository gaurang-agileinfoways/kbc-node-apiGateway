import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorator';
import { firstValueFrom } from 'rxjs';
import {
  USER_LOGIN,
  USER_SIGNUP,
} from 'src/common/serverPetterns/user-server.pettern';
import { LoginDto } from 'src/common/dto/common.dto';
import { CustomError } from 'src/common/helpers/exceptions';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('signup')
  @Public()
  async signup(@Body() body: CreateUserDto) {
    try {
      return await firstValueFrom(this.client.send(USER_SIGNUP, body));
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw new HttpException(
          error?.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      // this.client.send(USER_LOGIN, body).subscribe({
      //   next(value) {
      //     console.log(value);
      //   },
      //   error(err) {
      //     console.log(err);
      //   },
      // });
      const data = await firstValueFrom(this.client.send(USER_LOGIN, body));
      console.log(data);
    } catch (error) {
      console.log(error);

      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }
}
