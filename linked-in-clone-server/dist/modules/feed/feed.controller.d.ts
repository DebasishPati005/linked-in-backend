import { FeedService } from './feed.service';
import { UserEntity } from '../user/entities/user.entity';
import { CreateFeedRequest, UpdateFeedPostRequest } from './dto';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    create(createFeedDto: CreateFeedRequest, user: UserEntity): Promise<import("rxjs").Observable<{
        body: string;
        author: UserEntity;
    } & import("./entities/feed.entity").FeedEntity>>;
    findAllFeeds(): Promise<{
        count: number;
        result: import("./entities/feed.entity").FeedEntity[];
        error?: undefined;
    } | {
        error: string;
        count?: undefined;
        result?: undefined;
    }>;
    findFeedById(id: string): import("rxjs").Observable<import("./entities/feed.entity").FeedEntity>;
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
