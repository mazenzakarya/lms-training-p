import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './Dtos/login.dto';
import { RegisterUserDto } from './Dtos/registerUser.dto';
import { Public } from '../generic/public/public.decorator';
import { RefreshTokenDto } from './Dtos/refreshToken.dto';

@Controller('auth')
@Public()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    public async login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Post('register')
    public async register(@Body() dto: RegisterUserDto) {
        return this.authService.register(dto)
    }

    @Post('refresh')
    public async refresh(@Body() { refreshToken }: RefreshTokenDto) {
        return this.authService.refresh(refreshToken);
    }

    @Post('logout')
    public async logout(@Req() req){
        return this.authService.logOut(req.user.userId)
    }
    


}
