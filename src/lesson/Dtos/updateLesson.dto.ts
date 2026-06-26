import { IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class UpdateLessonDto {
    @IsString()
    @MinLength(6)
    @IsOptional()
    title?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    content?: string;

    @IsOptional()
    @IsMongoId()
    courseId?: string;

}