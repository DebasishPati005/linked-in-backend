"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAuthorGuard = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const feed_service_1 = require("../feed.service");
const user_service_1 = require("../../user/user.service");
const user_entity_1 = require("../../user/entities/user.entity");
let IsAuthorGuard = class IsAuthorGuard {
    constructor(userService, feedService) {
        this.userService = userService;
        this.feedService = feedService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { user, params } = request;
        if (user.role === user_entity_1.RolesEnum.ADMIN)
            return true;
        return (0, rxjs_1.from)(this.userService.findUserById(user.id).pipe((0, rxjs_1.switchMap)((user) => {
            return this.feedService.findFeedById(params.id).pipe((0, rxjs_1.map)((feedPost) => {
                return user.id === feedPost.author.id;
            }));
        })));
    }
};
exports.IsAuthorGuard = IsAuthorGuard;
exports.IsAuthorGuard = IsAuthorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        feed_service_1.FeedService])
], IsAuthorGuard);
//# sourceMappingURL=is-author.guard.js.map