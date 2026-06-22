import { Module } from '@nestjs/common';
import { UserPermissionsService } from './user-permissions.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../group/group.model';
import { PermissionsGuard } from './guards/permissions.guard';

@Module({
    providers: [UserPermissionsService, PermissionsGuard],
    exports: [UserPermissionsService],
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    ],
})
export class PermissionsModule { }
