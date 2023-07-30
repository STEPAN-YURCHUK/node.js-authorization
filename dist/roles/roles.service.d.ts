import { User } from 'src/users/models/user.model';
import { Role } from './models/role.model';
import { UserRole } from './models/user-role.model';
export declare class RolesService {
    private userRepository;
    private roleRepository;
    private userRoleRepository;
    constructor(userRepository: typeof User, roleRepository: typeof Role, userRoleRepository: typeof UserRole);
    create(dto: any): Promise<Role>;
    assignRolesToUser(userId: any, roleId: any): Promise<void>;
    getAll(): Promise<Role[]>;
    getUserRole(): Promise<UserRole[]>;
}
