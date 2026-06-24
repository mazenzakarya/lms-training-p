import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Course } from "./course.model";
import { CreateCourseDto } from "./Dtos/createCourse.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateCourseDto } from "./Dtos/updateCourse.dto";

@Injectable()
export class CoursesRepository {
    constructor(
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>
    ) { }

    public async createNewCourse(course: CreateCourseDto, instructorId: string) {
        const newCourse = new this.courseModel({ ...course, instructorId })
        return newCourse.save()
    }

    public async getAllCourses() {
        return this.courseModel.find()
    }

    public async getCourseById(id: string) {
        return this.courseModel.findById(id)
    }

    public async editCourseById(dto: UpdateCourseDto, id: string) {
        const course = await this.courseModel.findById(id);

        if (!course) {
            throw new NotFoundException();
        }
        if (dto.title) {
            course.title = dto.title;
        }
        if (dto.description) {
            course.description = dto.description
        }
        if (dto.price) {
            course.price = dto.price;
        }
        return course.save()
    }

    public async deleteCourseById(id: string) {
        return this.courseModel.findByIdAndDelete(id)
    }
}