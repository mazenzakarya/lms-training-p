import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './Dtos/createLesson.dto';
import { UpdateLessonDto } from './Dtos/updateLesson.dto';

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) { }

    @Post()
    public async createLesson(@Body() dto: CreateLessonDto) {
        return await this.lessonService.createNewLesson(dto)
    }

    @Get()
    public async getAllLessons() {
        return this.lessonService.getAllLessons()
    }

    @Get(':id')
    public async getLessonById(@Param('id') id: string) {
        return this.lessonService.getLessonById(id)
    }

    @Patch(':id')
    public async updateLesson(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
        return this.lessonService.updateLesson(id, dto);
    }

    @Delete(':id')
    public async deleteLesson(@Param('id') id: string) {
        await this.deleteLesson(id)
        return { message: "item deleted successfully" }
    }
}
