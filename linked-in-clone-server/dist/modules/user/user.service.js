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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const fs = require("fs");
const constant_1 = require("../../common/constant");
const friend_request_entity_1 = require("./entities/friend-request.entity");
let UserService = class UserService {
    constructor(userRepository, friendRequestRepository) {
        this.userRepository = userRepository;
        this.friendRequestRepository = friendRequestRepository;
    }
    findAll() {
        return (0, rxjs_1.from)(this.userRepository.find({ relations: ['feedPosts'], select: ['id', 'firstName', 'lastName', 'email', 'role'] })).pipe((0, rxjs_1.map)((user) => {
            if (!user) {
                return null;
            }
            return user;
        }));
    }
    findUserById(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            where: { id },
            relations: ['feedPosts'],
            select: ['id', 'firstName', 'lastName', 'email', 'role', 'profilePictureUrl'],
        })).pipe((0, rxjs_1.map)((user) => {
            if (!user) {
                throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.userErrorMessage, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.BAD_REQUEST);
            }
            return user;
        }));
    }
    saveUserProfilePicture(user, imageUrl) {
        if (user.profilePictureUrl) {
            const removingFilePath = __dirname + '../../../../' + user.profilePictureUrl;
            fs.unlink(removingFilePath, (err) => {
                if (!err) {
                    return this.updateUserRecord(user.id, { profilePictureUrl: imageUrl });
                }
            });
        }
        else {
            return this.updateUserRecord(user.id, { profilePictureUrl: imageUrl });
        }
    }
    updateUserRecord(id, updateUserRecord) {
        return (0, rxjs_1.from)(this.userRepository.update(id, updateUserRecord)).pipe((0, rxjs_1.map)((user) => {
            if (!user) {
                throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.userErrorMessage, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.BAD_REQUEST);
            }
            return user;
        }));
    }
    responseFriendRequest(currentUser, reqBody) {
        return (0, rxjs_1.from)(this.friendRequestRepository.findOne({
            where: { id: reqBody.requestId },
            relations: ['receiver'],
        })).pipe((0, rxjs_1.switchMap)((friendRequest) => {
            if (!friendRequest) {
                throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.noRecordExists, status: common_1.HttpStatus.UNPROCESSABLE_ENTITY }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            else {
                if (friendRequest.receiver.id !== currentUser.id) {
                    throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.notAllowedToOperate, status: common_1.HttpStatus.UNPROCESSABLE_ENTITY }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                }
                return (0, rxjs_1.from)(this.friendRequestRepository.update({ id: reqBody.requestId }, { status: reqBody.status })).pipe((0, rxjs_1.map)(() => {
                    return { success: constant_1.CONSTANT_STRINGS.successMessage };
                }));
            }
        }));
    }
    receivedFriendRequests(currentUser) {
        return (0, rxjs_1.from)(this.friendRequestRepository.find({
            where: { receiver: currentUser },
        })).pipe((0, rxjs_1.map)((friendRequestEntities) => {
            return friendRequestEntities;
        }));
    }
    receivedFriendRequestDetail(currentUser, requestId) {
        return (0, rxjs_1.from)(this.friendRequestRepository.findOne({ where: { id: +requestId, sender: currentUser } })).pipe((0, rxjs_1.map)((friendRequestEntities) => {
            if (!friendRequestEntities) {
                throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.badRequest, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return friendRequestEntities;
        }));
    }
    hasFriendRequestBefore(sender, receiver) {
        return (0, rxjs_1.from)(this.friendRequestRepository.findOne({
            where: [
                { sender, receiver },
                { receiver: sender, sender: receiver },
            ],
        })).pipe((0, rxjs_1.switchMap)((friendRequestEntity) => {
            return (0, rxjs_1.of)(!!friendRequestEntity);
        }));
    }
    sendFriendRequest(sendUser, receiverId) {
        if (sendUser.id === receiverId) {
            throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.sameUserFriendRequestError, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.findUserById(receiverId).pipe((0, rxjs_1.switchMap)((receiverDetail) => {
            return this.hasFriendRequestBefore(sendUser, receiverDetail).pipe((0, rxjs_1.switchMap)((hasSent) => {
                if (hasSent) {
                    throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.sendFriendRequestError, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.BAD_REQUEST);
                }
                return (0, rxjs_1.from)(this.friendRequestRepository.save({ sender: sendUser, receiver: receiverDetail, status: 'pending' }));
            }));
        }));
    }
    getUserProfileImage(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { id }, select: ['profilePictureUrl'] })).pipe((0, rxjs_1.map)((user) => {
            return { imageName: user.profilePictureUrl };
        }));
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(friend_request_entity_1.FriendRequestEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map