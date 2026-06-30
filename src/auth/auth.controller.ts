import { Body, Controller, HttpCode, HttpStatus, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './Dtos/login.dto';
import { RegisterUserDto } from './Dtos/registerUser.dto';
import { Public } from '../generic/decorators/public/public.decorator';
import { RefreshTokenDto } from './Dtos/refreshToken.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { ResponseMessage } from '../generic/decorators/response-message/response-message.decorator';


@Controller('auth')
@Public()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @HttpCode(HttpStatus.OK)
    @ResponseMessage('login success')
    @Post('login')
    public async login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    // @Post('register')
    // public async register(@Body() dto: RegisterUserDto) {
    //     return this.authService.register(dto)
    // }


    @Post('register')
    @UseInterceptors(FileInterceptor('image'))
    public async register(
        @Body() dto: RegisterUserDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.authService.register(dto, file);
    }
    @Post('refresh')
    public async refresh(@Body() { refreshToken }: RefreshTokenDto) {
        return this.authService.refresh(refreshToken);
    }

    @Post('logout')
    public async logout(@Req() req) {
        return this.authService.logOut(req.user.userId)
    }



}
