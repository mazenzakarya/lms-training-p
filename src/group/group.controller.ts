import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { UserPermissionsService } from '../permissions/user-permissions.service';
import { RequirePermissions } from '../permissions/decorators/permissions.decorator';
import { Permissions } from './enums/permissons.enum';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';

@Controller('group')
export class GroupController {
    constructor(
        private readonly groupService: GroupService,
        private readonly userPermissionsService: UserPermissionsService
    ) { }

    @RequirePermissions(Permissions.UserCreate)
    @Post()
    public async addNewGroup(@Body() group) {
        return this.groupService.addNewGroup(group)
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @RequirePermissions(Permissions.UserRead)
    @Get()
    public async getAllGroups() {
        return this.groupService.getAllGroups()
    }

    @Get('permissions/:id')
    async test(@Param('id') id: string) {
        return this.userPermissionsService.getUserPermissions(id);
    }

}
