import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GCPModule } from '../gcp/gcp.module';
import { WordModule } from '../words/word.module';
import { AppController } from './app/http/controllers/api/v1/app.controller';
import { AppService } from './data/services/app.service';
import { SettingModule } from '../settings/setting.module';

@Module({
  imports: [
    GCPModule,
    WordModule,
    SettingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      logging: process.env.DB_LOGGING === 'true',
      autoLoadEntities: true,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: false,
      synchronize: false,
      relationLoadStrategy: 'query',
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
