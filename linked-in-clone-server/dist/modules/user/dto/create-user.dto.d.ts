import { RolesEnum } from 'src/modules/user/entities/user.entity';
export declare class CreateUserRequest {
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: RolesEnum;
}
