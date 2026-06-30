import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { Course } from "./course.model";
import { CreateCourseDto } from "./Dtos/createCourse.dto";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateCourseDto } from "./Dtos/updateCourse.dto";
import { Lesson } from "../lesson/lesson.model";
import { paginate } from "../generic/pagination/pagination.service";
import { PaginationDto } from "../generic/pagination/pagination.dto";

@Injectable()
export class CoursesRepository {
    constructor(
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>
    ) { }

    public async createNewCourse(course: Partial<Lesson>) {
        const newCourse = new this.courseModel(course)
        return newCourse.save()
    }

    public async getAllCourses() {
        return this.courseModel.find()
    }

    public async getCourseById(id: string) {
        return this.courseModel.findById(id)
    }

    public async update(course: Course) {
        return await course.save();

    }

    public async deleteCourseById(id: string) {
        return this.courseModel.findByIdAndDelete(id)
    }

    public async findAllPaginated(dto: PaginationDto) {
        return paginate(
            this.courseModel,
            {},
            dto.page,
            dto.limit,
        );
    }
}