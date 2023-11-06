import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmConfigService } from "./typeorm/typeorm.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { UsersModule } from './users/users.module';
import { OperationsModule } from './operations/operations.module';
import { RecordsModule } from './records/records.module';
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./users/constants";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/configuration/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      extraProviders: [Logger],
    }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "3000m" },
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/web`,
    }),
    UsersModule,
    OperationsModule,
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule { }
