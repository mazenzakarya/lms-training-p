import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './course.repo';
import { CreateCourseDto } from './Dtos/createCourse.dto';
import { UpdateCourseDto } from './Dtos/updateCourse.dto';

@Injectable()
export class CourseService {
    constructor(
        private readonly courseRepository: CoursesRepository,

    ) { }

    public async addNewCourse(dto: CreateCourseDto, instructorId: string) {

        return this.courseRepository.createNewCourse(dto, instructorId )
    }

    public async getAllCourses(){
        return this.courseRepository.getAllCourses()
    }

    public async updateCourse(dto: UpdateCourseDto,id: string){
        return this.courseRepository.editCourseById(dto,id)
    }

    public async deleteCourse(id: string){
        return this.courseRepository.deleteCourseById(id)
    }

}
