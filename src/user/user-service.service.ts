import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserServiceService {
    constructor(private prisma:PrismaService){}
   async signup(dto:UserDto){
        const user=await this.prisma.user.create({data:{
            email:dto.email,
            name:dto.name,
        }})
        return user;

    }
    signIn(dto:UserDto){
        return "i am signIn"
    }
}