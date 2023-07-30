import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { Role } from 'src/roles/models/role.model';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    private roleRepository;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService, roleRepository: typeof Role);
    login(dto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    registration(dto: CreateUserDto): Promise<{
        access_token: string;
    }>;
    private generateToken;
    private validateUser;
}
