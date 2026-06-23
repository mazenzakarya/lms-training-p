import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule, } from './group/group.module';
import { PermissionsModule } from './permissions/permissions.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './permissions/guards/permissions.guard';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('MONGODB_URI'),
      dbName: configService.get('MONGODB_DB_NAME'),
    }),
  }), GroupModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: PermissionsGuard }],
})
export class AppModule { }
