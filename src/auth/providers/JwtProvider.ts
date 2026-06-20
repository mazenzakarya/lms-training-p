import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "../Interfaces/IJwtPayload";
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtProvider {
    constructor(
        private readonly jwtService: JwtService,
    ) { }
    public async generateToken(payload: IJwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }
    public async verifyToken(token: string): Promise<IJwtPayload> {
        return this.jwtService.verifyAsync(token);
    }
}