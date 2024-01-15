/// <reference types="multer" />
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserResponse } from './types';
import { Observable } from 'rxjs';
import { FriendRequestResponse, ResponseFriendRequestBody } from './dto/friend-request.dto';
import { ErrorResponse, SuccessResponse } from 'src/common/constant';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Observable<UserEntity[]>;
    uploadFile(user: UserResponse, file: Express.Multer.File): void;
    getUserImageName(user: UserResponse): Observable<{
        imageName: string;
    }>;
    sendFriendRequest(user: UserEntity, receiverId: string): Observable<FriendRequestResponse | ErrorResponse>;
    receivedFriendRequests(user: UserEntity): Observable<FriendRequestResponse[]>;
    receivedFriendRequestDetail(user: UserEntity, requestId: number): Observable<FriendRequestResponse>;
    responseFriendRequest(user: UserEntity, reqBody: ResponseFriendRequestBody): Observable<SuccessResponse | ErrorResponse>;
    remove(id: string): string;
}
