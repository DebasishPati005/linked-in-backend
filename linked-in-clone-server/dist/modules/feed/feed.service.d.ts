import { CreateFeedRequest, UpdateFeedPostRequest } from './dto';
import { Repository } from 'typeorm';
import { FeedEntity } from './entities/feed.entity';
import { Observable } from 'rxjs';
import { UserEntity } from '../user/entities/user.entity';
export declare class FeedService {
    private feedRepository;
    constructor(feedRepository: Repository<FeedEntity>);
    createFeed(createFeedDto: CreateFeedRequest, user: UserEntity): Promise<Observable<{
        body: string;
        author: UserEntity;
    } & FeedEntity>>;
    findAllFeeds(): Promise<{
        count: number;
        result: FeedEntity[];
        error?: undefined;
    } | {
        error: string;
        count?: undefined;
        result?: undefined;
    }>;
    findFeedById(id: string): Observable<FeedEntity>;
    updateFeedById(id: string, updateFeedDto: UpdateFeedPostRequest): Promise<{
        success: string;
        error?: undefined;
    } | {
        error: string;
        success?: undefined;
    }>;
    deleteFeedById(id: string): Promise<{
        success: string;
        error?: undefined;
    } | {
        error: string;
        success?: undefined;
    }>;
}
