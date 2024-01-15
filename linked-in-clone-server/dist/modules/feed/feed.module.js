"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModule = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
const feed_controller_1 = require("./feed.controller");
const typeorm_1 = require("@nestjs/typeorm");
const feed_entity_1 = require("./entities/feed.entity");
const is_author_guard_1 = require("./guards/is-author.guard");
const jwt_guard_1 = require("../authentication/guards/jwt.guard");
const roles_guard_1 = require("../authentication/guards/roles.guard");
const authentication_module_1 = require("../authentication/authentication.module");
let FeedModule = class FeedModule {
};
exports.FeedModule = FeedModule;
exports.FeedModule = FeedModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([feed_entity_1.FeedEntity]), authentication_module_1.AuthenticationModule],
        controllers: [feed_controller_1.FeedController],
        providers: [feed_service_1.FeedService, roles_guard_1.RolesGuard, jwt_guard_1.JwtGuard, is_author_guard_1.IsAuthorGuard],
    })
], FeedModule);
//# sourceMappingURL=feed.module.js.map