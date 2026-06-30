import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lesson } from "./lesson.model";

@Injectable()
export class LessonRepository {
    constructor(
        @InjectModel(Lesson.name)
        private readonly lessonModel: Model<Lesson>
    ) { }

    public async create(lesson: Partial<Lesson>) {
        const newLesson = new this.lessonModel(lesson);
        return newLesson.save();
    }

    public async getAll() {
        return this.lessonModel.find().lean();
    }

    public async getByCourseId(courseId: string) {
        return this.lessonModel.find({ courseId }).lean();
    }

    public async getById(id: string) {
        return this.lessonModel.findById(id);
    }

    public async update(lesson: Lesson) {
        return lesson.save();
    }

    public async delete(id: string) {
        return this.lessonModel.findByIdAndDelete(id);
    }
}