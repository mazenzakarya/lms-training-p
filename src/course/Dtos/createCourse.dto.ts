import { IsMongoId, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @MinLength(5)
    public title!: string;

    @IsString()
    @MinLength(5)
    description!: string

    @IsOptional()
    @IsNumber()
    price?: Number



}