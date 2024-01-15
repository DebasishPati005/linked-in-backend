import { AuthenticationService } from './authentication.service';
import { SignupResponse } from './types';
import { CreateUserRequest } from '../user/dto';
import { LoginUserRequest } from './dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    createUser(signupReq: CreateUserRequest): import("rxjs").Observable<SignupResponse>;
    loginUser(loginDto: LoginUserRequest): import("rxjs").Observable<Promise<{
        token?: string;
    }>>;
}
