import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './group.model';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupRepository } from './group.repo';
import { PermissionsModule } from '../permissions/permissions.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]), PermissionsModule, AuthModule],
    controllers: [GroupController],
    providers: [GroupService, GroupRepository],
    exports: [GroupService, GroupRepository]
})
export class GroupModule { }
