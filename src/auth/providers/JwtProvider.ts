import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "../Interfaces/IJwtPayload";
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtProvider {
    constructor(
        private readonly jwtService: JwtService,
    ) { }
    public async generateAccessToken(payload: IJwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
    public async generateRefreshToken(payload: IJwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload, { expiresIn: '7d' });
    }
    public async verifyAccessToken(token: string): Promise<IJwtPayload> {
        return this.jwtService.verifyAsync(token);
    }
    public async verifyRefreshToken(token: string): Promise<IJwtPayload> {
        return this.jwtService.verifyAsync(token);
    }
}