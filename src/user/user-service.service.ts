import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class UserServiceService {
  constructor(
    private prisma: PrismaService,
    private jwt:JwtService
  ) {}
  async signup(dto: UserDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hash,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException('crendentials are taken');
        }
      }
    }
  }
  async signIn(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('email dont found');
    }
    console.log('the user in the signin ', user);
    const pwMatch = await argon.verify(user.password, dto.password);
    if (!pwMatch) {
      throw new ForbiddenException('password dont matches');
    }
    delete user.password;
    return user
  }

  // async signToken(email, userId) {
  //   const secret = "karan"

  //   const payload = {
  //     sub: email,
  //     userId,
  //   };

  //   return this.jwt.signAsync(payload, {
  //     expiresIn: '15m',
  //     secret: secret,
  //   });
  }

