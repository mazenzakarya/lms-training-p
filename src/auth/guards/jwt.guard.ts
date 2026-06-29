import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtProvider } from '../providers/JwtProvider';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../generic/decorators/public/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly reflector: Reflector
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("No Auth found!")
    }
    const [_, token] = authHeader.split(' ');

    try {
      const payload = await this.jwtProvider.verifyAccessToken(token);

      request.user = {
        userId: payload.sub,
        email: payload.email,
      };

      return true;
    } catch (err: any) {
      console.log(err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
