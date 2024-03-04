import { Body, Controller, Post } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserDto } from './dto';

@Controller('auth')
export class UserControllerController {
  constructor(private userService: UserServiceService) {}
  @Post('/signin')
  signin(@Body() dto: UserDto) {
    console.log('the dto is ', dto);
    return this.userService.signIn(dto);
  }
  @Post('signup')
  signup(@Body() dto: UserDto) {
    return this.userService.signup(dto);
  }
}
