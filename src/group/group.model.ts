import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Permissions } from "./enums/permissons.enum";
import { IsString } from "class-validator";

@Schema()
export class Group extends Document {

    @Prop({ required: true, unique: true })
    @IsString()
    name!: string

    @Prop({
        type: [String],
        enum: Permissions,
        default: [],
    })
    permissions?: Permissions[]
}

export const GroupSchema = SchemaFactory.createForClass(Group);