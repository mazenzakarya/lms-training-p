import { Model } from "mongoose";
import { Group } from "./group.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class GroupRepository {
    constructor(
        @InjectModel(Group.name)
        private readonly groupModel: Model<Group>
    ) { }

    public async addNewGroup(group: Group) {
        const newGroup = new this.groupModel(group)
        return newGroup.save()
    }

    public async getGroups() {
        return this.groupModel.find();
    }
}
