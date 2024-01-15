"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const authentication_module_1 = require("./modules/authentication/authentication.module");
const feed_module_1 = require("./modules/feed/feed.module");
const env_1 = require("./env/env");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./modules/user/user.module");
const platform_express_1 = require("@nestjs/platform-express");
const core_1 = require("@nestjs/core");
const error_filter_1 = require("./common/error-filter");
const chat_module_1 = require("./modules/chat/chat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [new env_1.Environment().getEnvFilePath()],
                isGlobal: true,
            }),
            platform_express_1.MulterModule.register({ dest: '/images' }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                autoLoadEntities: true,
            }),
            feed_module_1.FeedModule,
            authentication_module_1.AuthenticationModule,
            user_module_1.UserModule,
            chat_module_1.ChatModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: error_filter_1.ErrorFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map