import { Injectable, NotFoundException } from '@nestjs/common';

import { LessonRepository } from './lesson.repo';
import { CreateLessonDto } from './Dtos/createLesson.dto';
import { UpdateLessonDto } from './Dtos/updateLesson.dto';

@Injectable()
export class LessonService {
    constructor(
        private readonly lessonRepository: LessonRepository
    ) { }

    public async createNewLesson(dto: CreateLessonDto) {
        return this.lessonRepository.create(dto);
    }

    public async getAllLessons() {
        return this.lessonRepository.getAll();
    }

    public async getLessonsByCourseId(courseId: string) {
        return this.lessonRepository.getByCourseId(courseId);
    }

    public async getLessonById(id: string) {
        const lesson = await this.lessonRepository.getById(id);

        if (!lesson) {
            throw new NotFoundException("Lesson not found");
        }

        return lesson;
    }

    public async updateLesson(id: string, dto: UpdateLessonDto) {
        const lesson = await this.lessonRepository.getById(id);

        if (!lesson) {
            throw new NotFoundException("Lesson not found");
        }

        if (dto.title !== undefined) {
            lesson.title = dto.title;
        }

        if (dto.content !== undefined) {
            lesson.content = dto.content;
        }

        if (dto.courseId !== undefined) {
            lesson.courseId = dto.courseId;
        }

        return this.lessonRepository.update(lesson);
    }

    public async deleteLesson(id: string) {
        const lesson = await this.lessonRepository.getById(id);

        if (!lesson) {
            throw new NotFoundException("Lesson not found");
        }

        await this.lessonRepository.delete(id);

        return { message: "Lesson deleted successfully" };
    }

}