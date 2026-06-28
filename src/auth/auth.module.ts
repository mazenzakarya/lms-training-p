import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/HashingProvider';
import { JwtProvider } from './providers/JwtProvider';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    UsersModule,
    UploadModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN') ?? '3600', 10),

        },
      }),
    }),
  ],

  providers: [AuthService, HashingProvider, JwtProvider],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider, JwtProvider]
})
export class AuthModule { }
