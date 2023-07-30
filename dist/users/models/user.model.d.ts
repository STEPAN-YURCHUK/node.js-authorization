import { Model } from 'sequelize-typescript';
import { Role } from 'src/roles/models/role.model';
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    isActivation: boolean;
    activationLink: string;
    roles: Role[];
}
export {};
