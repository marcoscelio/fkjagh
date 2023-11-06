import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EncryptionUtils } from 'src/utils/encryption/encryptionUtils';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3000m" },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, EncryptionUtils],
})
export class UsersModule { }
