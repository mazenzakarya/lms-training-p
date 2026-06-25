import { IsMongoId, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateLessonDto {
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    title!: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    content!: string;

    @IsMongoId()
    courseId!: string;

}