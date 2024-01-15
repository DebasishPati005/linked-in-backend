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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const constant_1 = require("../../common/constant");
const user_entity_1 = require("../user/entities/user.entity");
let AuthenticationService = class AuthenticationService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.generateHash = (password) => {
            return (0, rxjs_1.from)(bcrypt.hash(password, 12));
        };
        this.verifyUserPassword = (password, hashedPassword) => {
            return (0, rxjs_1.from)(bcrypt.compare(password, hashedPassword));
        };
    }
    findUser(email) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            where: { email },
        })).pipe((0, operators_1.switchMap)((user) => {
            if (!user) {
                return (0, rxjs_1.of)(null);
            }
            return (0, rxjs_1.of)(user);
        }));
    }
    signupUser(signUpRequest) {
        return this.findUser(signUpRequest.email).pipe((0, operators_1.switchMap)((user) => {
            if (user) {
                throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.recordExists, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.BAD_REQUEST);
            }
            return this.generateHash(signUpRequest.password).pipe((0, operators_1.switchMap)((hashedPassword) => {
                return (0, rxjs_1.from)(this.userRepository.save({
                    ...signUpRequest,
                    hash: hashedPassword,
                })).pipe((0, operators_1.map)((user) => {
                    delete user.hash;
                    delete user.role;
                    delete user.password;
                    delete user.confirmPassword;
                    delete user.id;
                    return user;
                }));
            }));
        }));
    }
    validateUser(loginUserDto) {
        return this.findUser(loginUserDto.email).pipe((0, operators_1.switchMap)((user) => {
            if (!user) {
                throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.invalidCredentialErrorMessage, status: common_1.HttpStatus.NOT_FOUND }, common_1.HttpStatus.BAD_REQUEST);
            }
            return this.verifyUserPassword(loginUserDto.password, user.hash).pipe((0, operators_1.map)((doesUserExist) => {
                if (doesUserExist) {
                    delete user.hash;
                    return user;
                }
            }));
        }));
    }
    loginUser(loginUserDto) {
        return this.validateUser(loginUserDto).pipe((0, operators_1.map)(async (existingUser) => {
            if (!existingUser) {
                throw new common_1.HttpException({ message: constant_1.CONSTANT_STRINGS.userErrorMessage, status: common_1.HttpStatus.UNAUTHORIZED }, common_1.HttpStatus.UNAUTHORIZED);
            }
            return {
                token: await this.jwtService.signAsync({
                    user: existingUser,
                }, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION_TIME }),
            };
        }));
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map