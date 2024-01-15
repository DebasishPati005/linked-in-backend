import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: Repository<UserEntity>);
    validate(requestPaylod: {
        user: UserEntity;
    }): Promise<UserEntity>;
}
export {};
