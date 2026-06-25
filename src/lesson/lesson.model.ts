import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "../users/users.model";

@Schema()
export class Lesson extends Document {

    @Prop({ required: true })
    title!: string;

    @Prop()
    content!: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: () => Lesson })
    courseId!: string;


}

export const LessonSchema = SchemaFactory.createForClass(Lesson)