import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Course } from "../course/course.model";

@Schema()
export class Lesson extends Document {

    @Prop({ required: true })
    title!: string;

    @Prop()
    content!: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: () => Course.name })
    courseId!: string;


}

export const LessonSchema = SchemaFactory.createForClass(Lesson)