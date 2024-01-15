import { RolesEnum } from 'src/modules/user/entities/user.entity';
import { CreateUserRequest } from './create-user.dto';
declare const UpdateUserRequest_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserRequest>>;
export declare class UpdateUserRequest extends UpdateUserRequest_base {
    firstName?: string;
    lastName?: string;
    profilePictureUrl?: string;
    email?: string;
    role?: RolesEnum;
}
export {};
