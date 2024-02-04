import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserControllerController } from './user-controller.controller';
import { JwtModule} from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserControllerController],
  providers: [UserServiceService],
})
export class UserModule {}
