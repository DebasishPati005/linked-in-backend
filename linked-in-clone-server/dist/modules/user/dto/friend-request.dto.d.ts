import { UserEntity } from '../entities/user.entity';
export type Friend_Request_Status = 'pending' | 'accepted' | 'declined';
export interface FriendRequestStatus {
    status?: Friend_Request_Status;
}
export declare class FriendRequestResponse {
    id: number;
    sender: UserEntity;
    receiver: UserEntity;
    status: Friend_Request_Status;
}
export declare class ResponseFriendRequestBody {
    requestId: number;
    status: Friend_Request_Status;
}
