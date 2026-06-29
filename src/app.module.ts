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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PermissionsGuard } from './permissions/guards/permissions.guard';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { LessonModule } from './lesson/lesson.module';
import { UploadModule } from './upload/upload.module';
import { TransformerInterceptor } from './generic/interceptors/transformer/transformer.interceptor';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('MONGODB_URI'),
      dbName: configService.get('MONGODB_DB_NAME'),
    }),
  }), GroupModule, PermissionsModule, CourseModule, EnrollmentModule, LessonModule, UploadModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: PermissionsGuard }, { provide: APP_INTERCEPTOR, useClass: TransformerInterceptor }],
})
export class AppModule { }
