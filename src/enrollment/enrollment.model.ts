import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Course } from "../course/course.model";
import { User } from "../users/users.model";

@Schema()
export class Enrollment extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: () => User.name, required: true })
    userId!: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: () => Course.name, required: true })
    courseId!: string;

    @Prop()
    enrolledAt!: Date;
}
export const EnrollmentSchmea = SchemaFactory.createForClass(Enrollment)