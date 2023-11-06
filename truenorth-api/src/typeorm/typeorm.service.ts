import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import fs from "fs"

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private config: ConfigService;

  @Inject(Logger)
  private logger: Logger;

  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const isProd = this.config.get<string>('NODE_ENV') === 'production';

    const ssl = isProd ? {
      ca: fs
        .readFileSync("./src/typeorm/rds-ca-2019-root.pem")
        .toString()
    } : false

    return {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      database: this.config.get<string>('DB_DATABASE'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASSWORD'),
      // migrationsRun: this.config.get<boolean>('RUN_MIGRATIONS'),
      entities: ['dist/**/*.entity.{ts,js}'],
      // migrations: ['dist/migrations/*.{ts,js}'],
      // migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true,
      ssl,
    }
  }
}
