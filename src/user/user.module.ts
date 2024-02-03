import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserControllerController } from './user-controller.controller'; 

@Module({
    controllers:[UserControllerController],
    providers:[UserServiceService]
})
export class UserModule {
    
}
