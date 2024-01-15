import { UserEntity } from 'src/modules/user/entities/user.entity';
export declare class FeedEntity {
    id: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: UserEntity;
}
