import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';


export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    @MinLength(5)
    public title?: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    description?: string

    @IsOptional()
    @IsNumber()
    price?: number
}