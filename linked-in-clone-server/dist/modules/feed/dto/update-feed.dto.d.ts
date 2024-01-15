import { CreateFeedRequest } from './create-feed.dto';
declare const UpdateFeedPostRequest_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFeedRequest>>;
export declare class UpdateFeedPostRequest extends UpdateFeedPostRequest_base {
    body?: string;
}
export {};
