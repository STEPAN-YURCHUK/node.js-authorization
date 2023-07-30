import { MailService } from 'src/mail/mail.service';
import { Role } from 'src/roles/models/role.model';
import { RolesService } from 'src/roles/roles.service';
import { User } from './models/user.model';
export declare class UsersService {
    private userRepository;
    private roleRepository;
    private rolesService;
    private mailService;
    constructor(userRepository: typeof User, roleRepository: typeof Role, rolesService: RolesService, mailService: MailService);
    createUser(dto: any): Promise<User>;
    getAllUser(): Promise<User[]>;
    getUserByEmail(email: string): Promise<User>;
    activate(activationLink: any): Promise<string>;
}
