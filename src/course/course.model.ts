import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "../users/users.model";
import { Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Course extends Document {

    @Prop({ required: true })
    title!: string

    @Prop({ required: true })
    description!: string

    @Prop({ default: 0 })
    price!: Number

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: User.name,
        required: true,
    })
    instructorId!: User


}

export const CourseSchema = SchemaFactory.createForClass(Course)


// Virtual Populate
CourseSchema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'courseId',
});

CourseSchema.set('toJSON', { virtuals: true });
CourseSchema.set('toObject', { virtuals: true });