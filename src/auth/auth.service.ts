import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
            throw new UnauthorizedException('invalid credintials');
        }
        const isPasswordValid = await this.hashingProvider.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('invalid credintials')
        }
        const payload = {
            sub: user.id,
            email: user.email
        }


        //generate jwt and refresh token
        const jwt = await this.jwtProvider.generateAccessToken(payload)
        const refreshToken = await this.jwtProvider.generateRefreshToken(payload)
        const hashedRefreshToken = await this.hashingProvider.hash(refreshToken);
        //save hashed refresh token to user
        await this.usersRepository.updateRefreshToken(user.id, hashedRefreshToken);

        return { jwt, refreshToken };
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
            groups: dto.groupsIds,
            password: await this.hashingProvider.hash(dto.password)
        });
        return !!user;
    }

    public async refresh(refreshToken: string) {
        const payload = await this.jwtProvider.verifyRefreshToken(refreshToken);
        const user = await this.usersRepository.findById(payload.sub)
        if (user?.refreshToken) {
            const isValid = await this.hashingProvider.compare(refreshToken, user?.refreshToken)
            if (isValid) {

                const jwt = await this.jwtProvider.generateAccessToken(payload)
                const refreshedToken = await this.jwtProvider.generateRefreshToken(payload)
                //save the new hashed jwt in db
                const newRefreshdTokenHashed = await this.hashingProvider.hash(refreshedToken)
                if (user?.refreshToken) {
                    user.refreshToken = newRefreshdTokenHashed
                    await user.save();
                }
                return { jwt, refreshedToken }
            }
        }
        throw new UnauthorizedException("Invalid refresh token");

    }

    public async logOut(id: string) {
        const user = await this.usersRepository.findById(id)
        if (user) {
            user.refreshToken = ''
            return await this.usersRepository.update(user)
        }
        throw new BadRequestException('something went wrong')
    }
}
