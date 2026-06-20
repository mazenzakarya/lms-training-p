import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator"

 export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    public name!: string
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    public password!: string

    @IsString()
    public profileImage?:string
}