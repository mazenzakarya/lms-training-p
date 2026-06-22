import { Permissions } from '../enums/permissons.enum';
import { MainGroups } from './main-groups.enum';

export const predefinedGroups = [
    {
        name: MainGroups.SuperAdmin,
        permissions: Object.values(Permissions),
    },
    {
        name: MainGroups.Admin,
        permissions: [
            Permissions.UserCreate,
            Permissions.UserRead,
            Permissions.UserUpdate,
        ],
    },
    {
        name: MainGroups.Instructor,
        permissions: [
            Permissions.UserCreate,
            Permissions.UserRead,
            Permissions.UserUpdate,
        ],
    },
    {
        name: MainGroups.NormalUser,
        permissions: [],
    },
];