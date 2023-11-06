import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { EncryptionUtils } from 'src/utils/encryption/encryptionUtils';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3000m" },
    }),
  ],
  controllers: [OperationsController],
  providers: [OperationsService, UsersService, EncryptionUtils],
})
export class OperationsModule { }
