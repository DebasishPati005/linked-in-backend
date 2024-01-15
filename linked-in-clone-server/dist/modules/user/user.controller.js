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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_guard_1 = require("../authentication/guards/jwt.guard");
const roles_guard_1 = require("../authentication/guards/roles.guard");
const get_user_decorator_1 = require("../../common/decorator/get-user.decorator");
const upload_image_1 = require("../../common/upload-image");
const platform_express_1 = require("@nestjs/platform-express");
const user_entity_1 = require("./entities/user.entity");
const rxjs_1 = require("rxjs");
const friend_request_dto_1 = require("./dto/friend-request.dto");
const constant_1 = require("../../common/constant");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    uploadFile(user, file) {
        this.userService.saveUserProfilePicture(user, file.filename);
    }
    getUserImageName(user) {
        return this.userService.getUserProfileImage(user.id);
    }
    sendFriendRequest(user, receiverId) {
        return this.userService.sendFriendRequest(user, receiverId);
    }
    receivedFriendRequests(user) {
        return this.userService.receivedFriendRequests(user);
    }
    receivedFriendRequestDetail(user, requestId) {
        return this.userService.receivedFriendRequestDetail(user, requestId);
    }
    responseFriendRequest(user, reqBody) {
        return this.userService.responseFriendRequest(user, reqBody);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('all-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('save-profile-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', upload_image_1.saveImageConfig)),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Success', type: constant_1.SuccessResponse }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('image-name'),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Success', type: String }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "getUserImageName", null);
__decorate([
    (0, common_1.Post)('friend-request/send/:receiverId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: friend_request_dto_1.FriendRequestResponse }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Success', type: constant_1.ErrorResponse }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Get)('friend-request/received'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: [friend_request_dto_1.FriendRequestResponse] }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "receivedFriendRequests", null);
__decorate([
    (0, common_1.Get)('friend-request/received/:requestId'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: [friend_request_dto_1.FriendRequestResponse] }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('requestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "receivedFriendRequestDetail", null);
__decorate([
    (0, common_1.Put)('friend-request/response'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success', type: constant_1.SuccessResponse }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error', type: constant_1.ErrorResponse }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        friend_request_dto_1.ResponseFriendRequestBody]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "responseFriendRequest", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map