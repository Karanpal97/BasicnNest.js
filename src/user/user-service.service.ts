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
    private jwt: JwtService,
  ) {}
  async signup(dto: UserDto) {
    if (!dto.password) {
      throw new Error('Password is undefined');
    }
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
      console.log('the error in the code', error);
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

    return this.signToken(dto.email, dto.name);
  }

  async signToken(email, name) {
    const payload = {
      sub: email,
      name: name,
    };

    return this.jwt.signAsync(payload);
  }
}
