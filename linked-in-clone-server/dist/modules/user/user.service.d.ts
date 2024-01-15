import { UserEntity } from './entities/user.entity';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserResponse } from './types';
import { UpdateUserRequest } from './dto';
import { ErrorResponse, SuccessResponse } from 'src/common/constant';
import { FriendRequestResponse, ResponseFriendRequestBody } from './dto/friend-request.dto';
import { FriendRequestEntity } from './entities/friend-request.entity';
export declare class UserService {
    private userRepository;
    private friendRequestRepository;
    constructor(userRepository: Repository<UserEntity>, friendRequestRepository: Repository<FriendRequestEntity>);
    findAll(): Observable<UserEntity[]>;
    findUserById(id: string): Observable<UserEntity>;
    saveUserProfilePicture(user: UserResponse, imageUrl: string): Observable<import("typeorm").UpdateResult>;
    updateUserRecord(id: string, updateUserRecord: UpdateUserRequest): Observable<import("typeorm").UpdateResult>;
    responseFriendRequest(currentUser: UserEntity, reqBody: ResponseFriendRequestBody): Observable<SuccessResponse | ErrorResponse>;
    receivedFriendRequests(currentUser: UserEntity): Observable<FriendRequestResponse[]>;
    receivedFriendRequestDetail(currentUser: UserEntity, requestId: number): Observable<FriendRequestResponse>;
    hasFriendRequestBefore(sender: UserEntity, receiver: UserEntity): Observable<boolean>;
    sendFriendRequest(sendUser: UserEntity, receiverId: string): Observable<FriendRequestResponse>;
    getUserProfileImage(id: string): Observable<{
        imageName: string;
    }>;
    remove(id: number): string;
}
