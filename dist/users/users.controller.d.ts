import { CreateUserDto } from './dto/create.user.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(dto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
    activate(activationLink: string): Promise<string>;
}
