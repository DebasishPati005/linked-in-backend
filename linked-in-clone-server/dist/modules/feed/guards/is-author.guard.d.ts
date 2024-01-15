import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FeedService } from '../feed.service';
import { UserService } from 'src/modules/user/user.service';
export declare class IsAuthorGuard implements CanActivate {
    private userService;
    private feedService;
    constructor(userService: UserService, feedService: FeedService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
