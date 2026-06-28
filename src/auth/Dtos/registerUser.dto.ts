import { IsArray, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator"
import { Permissions } from "../../group/enums/permissons.enum"

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

    // @IsString()
    // public profileImage?: string
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    public groupsIds?: string[];
}