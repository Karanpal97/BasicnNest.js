import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserControllerController } from './user-controller.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'Karan',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserControllerController],
  providers: [UserServiceService],
})
export class UserModule {}
