import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UsersRoles } from "./enums/UsersRoles.enum";
import { Document } from "mongoose";


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

    @Prop({required: true, enum: UsersRoles, default: UsersRoles.USER})
    role!: UsersRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);