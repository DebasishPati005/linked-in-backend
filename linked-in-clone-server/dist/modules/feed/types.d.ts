import { UserResponse } from '../user/types';
export declare class FeedPostResponse {
    body: string;
    id: string;
    author: UserResponse;
    createdAt: Date;
    updatedAt: Date;
}
