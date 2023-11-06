import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { EncryptionUtils } from 'src/utils/encryption/encryptionUtils';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3000m" },
    }),
  ],
  controllers: [RecordsController],
  providers: [RecordsService, UsersService, EncryptionUtils],
})
export class RecordsModule { }
