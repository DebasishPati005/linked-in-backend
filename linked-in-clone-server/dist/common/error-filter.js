"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("./constant");
const fs = require("fs");
let ErrorFilter = class ErrorFilter {
    constructor() {
        this.getErrorResponse = (request, message, status) => ({
            statusCode: status,
            message,
            method: request.method,
            path: request.url,
            timeStamp: new Date().toUTCString(),
        });
        this.writeErrorLogIntoFile = (logString) => {
            fs.appendFile('errors.log', logString, 'utf8', (err) => {
                if (!err) {
                    console.log('Error Appended');
                }
            });
        };
    }
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        let errorMessage = constant_1.CONSTANT_STRINGS.defaultErrorMessage;
        let erroStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof common_1.HttpException) {
            erroStatus = exception.getStatus();
            const errorResponse = exception.getResponse();
            errorMessage = errorResponse.message ?? exception.message;
        }
        const customizedError = this.getErrorResponse(request, errorMessage, erroStatus);
        const loggingString = this.getLogString(customizedError, request, exception);
        this.writeErrorLogIntoFile(loggingString);
        response.status(erroStatus).json(customizedError);
    }
    getLogString(customizedError, request, exception) {
        return `ResponseCode:${customizedError.statusCode}, \t Method: ${customizedError.method}, \tPath:${customizedError.path}\n${JSON.stringify(customizedError)}\n\nUser: ${request.user ? JSON.stringify(request.user) : 'Not Signed In.!'}StackTrace:${exception instanceof common_1.HttpException ? exception.stack : customizedError.message}\n\n
    `;
    }
};
exports.ErrorFilter = ErrorFilter;
exports.ErrorFilter = ErrorFilter = __decorate([
    (0, common_1.Catch)()
], ErrorFilter);
//# sourceMappingURL=error-filter.js.map