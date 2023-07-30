import { CreateRoleDto } from './dto/create.role.dto';
import { AddUserRoleDto } from './dto/create.userrole.dto';
import { Role } from './models/role.model';
import { RolesService } from './roles.service';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    createRole(dto: CreateRoleDto): Promise<Role>;
    addRole(dto: AddUserRoleDto): Promise<void>;
    getAll(): Promise<Role[]>;
}
