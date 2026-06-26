import { BadRequestException, Injectable } from '@nestjs/common';
import { CoursesRepository } from './course.repo';
import { CreateCourseDto } from './Dtos/createCourse.dto';
import { UpdateCourseDto } from './Dtos/updateCourse.dto';

@Injectable()
export class CourseService {
    constructor(
        private readonly courseRepository: CoursesRepository,

    ) { }

    public async addNewCourse(dto: CreateCourseDto) {

        return this.courseRepository.createNewCourse(dto)
    }

    public async getAllCourses() {
        return this.courseRepository.getAllCourses()
    }

    public async updateCourse(dto: UpdateCourseDto, id: string) {
        const course = await this.courseRepository.getCourseById(id)
        if (!course) { throw new BadRequestException("course not found") }
        if (dto.title !== undefined) {
            course.title = dto.title;
        }

        if (dto.description !== undefined) {
            course.description = dto.description;
        }

        if (dto.price !== undefined) {
            course.price = dto.price;
        }
        return this.courseRepository.update(course);
    }

    public async deleteCourse(id: string) {
        return this.courseRepository.deleteCourseById(id)
    }

}
