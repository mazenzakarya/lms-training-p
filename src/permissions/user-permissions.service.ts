import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersRepository } from '../users/users.repo';
import { Group } from '../group/group.model';
import { Model } from 'mongoose';

@Injectable()
export class UserPermissionsService {
    constructor(
        private readonly usersRepository: UsersRepository,
        @InjectModel(Group.name)
        private readonly groupModel: Model<Group>,
    ) { }


    async getUserPermissions(userId: string) {
        const user = await this.usersRepository.getUserGroups(userId);

        const groups = await this.groupModel.find({
            _id: { $in: user?.groups }
        });


        return [
            ...new Set(
                groups.flatMap(g => g.permissions ?? [])
            )
        ];

    }

}
