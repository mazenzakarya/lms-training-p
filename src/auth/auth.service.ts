import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingProvider } from './providers/HashingProvider';
import { JwtProvider } from './providers/JwtProvider';
import { UsersRepository } from '../users/users.repo';
import { LoginDto } from './Dtos/login.dto';
import { RegisterUserDto } from './Dtos/registerUser.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly hashingProvider: HashingProvider,
        private readonly usersRepository: UsersRepository,
        private readonly jwtProvider: JwtProvider
    ) { }

    async login(dto: LoginDto) {
        const user = await this.usersRepository.findByEmail(dto.email);
        if (!user) {
            return false;
        }
        const isPasswordValid = await this.hashingProvider.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('invalid credintials')
        }
        const payload = {
            sub: user.id,
            email: user.email
        }
        const jwt = await this.jwtProvider.generateToken(payload)
        return jwt;
    }

    async register(dto: RegisterUserDto): Promise<boolean> {
        const existingUser = await this.usersRepository.findByEmail(dto.email);
        if (existingUser) {
            return false;
        }
        const user = await this.usersRepository.createUser({
            name: dto.name,
            email: dto.email,
            profileImage: dto.profileImage,
            password: await this.hashingProvider.hash(dto.password)
        });
        return !!user;
    }
}
