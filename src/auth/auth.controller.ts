import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './Dtos/login.dto';
import { RegisterUserDto } from './Dtos/registerUser.dto';
import { Public } from '../generic/public/public.decorator';

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
}
