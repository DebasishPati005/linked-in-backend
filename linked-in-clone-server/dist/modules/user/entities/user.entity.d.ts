import { FeedEntity } from 'src/modules/feed/entities/feed.entity';
import { FriendRequestEntity } from './friend-request.entity';
export declare enum RolesEnum {
    USER = "user",
    PREMIUM = "premium",
    ADMIN = "admin"
}
export declare class UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    hash: string;
    profilePictureUrl: string;
    role: RolesEnum;
    feedPosts: FeedEntity[];
    sentFriendRequests: FriendRequestEntity[];
    receivedFriendRequests: FriendRequestEntity[];
}
