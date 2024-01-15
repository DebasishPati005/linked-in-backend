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
exports.ROLES_KEY = exports.ErrorResponse = exports.SuccessResponse = exports.CONSTANTS = exports.CONSTANT_STRINGS = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.CONSTANT_STRINGS = {
    swaggerTitle: 'LinkedIn Clone Application',
    swaggerDescription: 'Linked In Application API description for future front-end integration',
    swaggerVersion: '1.0',
    swaggerTag: 'LinkedIn Clone Application',
    feedErrorMessage: 'No feed found with given Id',
    userErrorMessage: 'No User found with given Id',
    invalidCredentialErrorMessage: 'Invalid Credentials were given .',
    recordExists: 'Existing Record found  with this data.',
    noRecordExists: 'No Record found  with this data.',
    defaultErrorMessage: 'Server Error!',
    badRequest: 'Bad request!',
    notAllowedToOperate: 'Not allowed for operation.',
    unacceptableFileType: 'FileType is not accepted please select ./jpeg/png/jpg type file',
    passwordsNotMatching: 'Password and Confirm Password should be same.',
    successMessage: 'Operation Successful!',
    sameUserFriendRequestError: 'Can not sent to yourself!',
    sendFriendRequestError: 'Request is already there between both of you!',
};
exports.CONSTANTS = {
    validFileMimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
    validFileExtensions: ['jpeg', 'jpg', 'png'],
};
class SuccessResponse {
}
exports.SuccessResponse = SuccessResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SuccessResponse.prototype, "success", void 0);
class ErrorResponse {
}
exports.ErrorResponse = ErrorResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ErrorResponse.prototype, "error", void 0);
exports.ROLES_KEY = 'roles';
//# sourceMappingURL=constant.js.map