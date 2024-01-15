import { Friend_Request_Status } from '../dto/friend-request.dto';
import { UserEntity } from './user.entity';
export declare class FriendRequestEntity {
    id: number;
    sender: UserEntity;
    receiver: UserEntity;
    status: Friend_Request_Status;
}
