import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserControllerController } from './user/user-controller.controller';
import { UserServiceService } from './user/user-service.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, BookmarkModule, PrismaModule],
  controllers: [AppController, UserControllerController],
  providers: [AppService, UserServiceService, PrismaService],
})
export class AppModule {}
