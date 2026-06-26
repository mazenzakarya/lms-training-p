import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Group } from "../group/group.model";


@Schema()
export class User extends Document {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    password!: string;

    @Prop({ required: false })
    profileImage?: string;


    @Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: () => Group.name }],
        default: [],
    })
    groups?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);