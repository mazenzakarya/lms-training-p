import { Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repo';
import { Group } from './group.model';

@Injectable()
export class GroupService {
    constructor(
        private readonly groupRepository: GroupRepository
    ) { }
    public async getAllGroups() {
        return this.groupRepository.getGroups();
    }

    public async addNewGroup(group: Group) {
        return this.groupRepository.addNewGroup(group)
    }

}
