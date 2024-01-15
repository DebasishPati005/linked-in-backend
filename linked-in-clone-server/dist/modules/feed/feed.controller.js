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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
const constant_1 = require("../../common/constant");
const types_1 = require("./types");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../authentication/guards/jwt.guard");
const role_decorator_1 = require("../authentication/decorator/role.decorator");
const is_author_guard_1 = require("./guards/is-author.guard");
const roles_guard_1 = require("../authentication/guards/roles.guard");
const user_entity_1 = require("../user/entities/user.entity");
const dto_1 = require("./dto");
const get_user_decorator_1 = require("../../common/decorator/get-user.decorator");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    create(createFeedDto, user) {
        return this.feedService.createFeed(createFeedDto, user);
    }
    findAllFeeds() {
        return this.feedService.findAllFeeds();
    }
    findFeedById(id) {
        return this.feedService.findFeedById(id);
    }
    updateFeedById(id, updateFeedDto) {
        return this.feedService.updateFeedById(id, updateFeedDto);
    }
    deleteFeedById(id) {
        return this.feedService.deleteFeedById(id);
    }
};
exports.FeedController = FeedController;
__decorate([
    (0, role_decorator_1.Role)(user_entity_1.RolesEnum.ADMIN, user_entity_1.RolesEnum.PREMIUM),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: types_1.FeedPostResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateFeedRequest, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all-feeds'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: [types_1.FeedPostResponse] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "findAllFeeds", null);
__decorate([
    (0, common_1.Get)('feedById/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: types_1.FeedPostResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "findFeedById", null);
__decorate([
    (0, common_1.Patch)('updateById/:id'),
    (0, common_1.UseGuards)(is_author_guard_1.IsAuthorGuard),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: constant_1.SuccessResponse }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateFeedPostRequest]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "updateFeedById", null);
__decorate([
    (0, common_1.Delete)('deleteById/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: constant_1.SuccessResponse }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "deleteFeedById", null);
exports.FeedController = FeedController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedController);
//# sourceMappingURL=feed.controller.js.map