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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feed_entity_1 = require("./entities/feed.entity");
const constant_1 = require("../../common/constant");
const rxjs_1 = require("rxjs");
let FeedService = class FeedService {
    constructor(feedRepository) {
        this.feedRepository = feedRepository;
    }
    async createFeed(createFeedDto, user) {
        const feedPostData = {
            body: createFeedDto.body,
            author: user,
        };
        return (0, rxjs_1.from)(this.feedRepository.save(feedPostData));
    }
    async findAllFeeds() {
        const count = await this.feedRepository.count();
        const result = await this.feedRepository.find({
            order: { createdAt: 'DESC' },
        });
        return result ? { count, result } : { error: constant_1.CONSTANT_STRINGS.feedErrorMessage };
    }
    findFeedById(id) {
        return (0, rxjs_1.from)(this.feedRepository.findOne({ where: { id }, relations: ['author'] }));
    }
    async updateFeedById(id, updateFeedDto) {
        const result = await this.feedRepository.update(id, updateFeedDto);
        return result.affected > 0
            ? { success: constant_1.CONSTANT_STRINGS.successMessage }
            : { error: constant_1.CONSTANT_STRINGS.feedErrorMessage };
    }
    async deleteFeedById(id) {
        const result = await this.feedRepository.delete(id);
        return result.affected > 0
            ? { success: constant_1.CONSTANT_STRINGS.successMessage }
            : { error: constant_1.CONSTANT_STRINGS.feedErrorMessage };
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feed_entity_1.FeedEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FeedService);
//# sourceMappingURL=feed.service.js.map