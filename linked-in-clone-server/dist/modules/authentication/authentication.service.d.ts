import { LoginUserRequest } from './dto';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserRequest } from '../user/dto';
import { SignupResponse } from './types';
export declare class AuthenticationService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    generateHash: (password: string) => Observable<string>;
    verifyUserPassword: (password: string, hashedPassword: string) => Observable<boolean>;
    findUser(email: string): Observable<UserEntity | null>;
    signupUser(signUpRequest: CreateUserRequest): Observable<SignupResponse>;
    validateUser(loginUserDto: LoginUserRequest): Observable<UserEntity>;
    loginUser(loginUserDto: LoginUserRequest): Observable<Promise<{
        token?: string;
    }>>;
}
