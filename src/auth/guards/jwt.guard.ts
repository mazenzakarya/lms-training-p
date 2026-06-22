import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtProvider } from '../providers/JwtProvider';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtProvider: JwtProvider
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("No Auth found!")
    }
    const [_, token] = authHeader.split(' ');

    try {
      const payload = await this.jwtProvider.verifyToken(token);

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
