import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Request } from 'express';
type CustomErrorResponse = {
    statusCode: number;
    message: string;
    method: string;
    path: string;
    timeStamp: string;
};
export declare class ErrorFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
    getErrorResponse: (request: Request, message: string, status: number) => CustomErrorResponse;
    getLogString(customizedError: CustomErrorResponse, request: Request, exception: unknown): string;
    writeErrorLogIntoFile: (logString: string) => void;
}
export {};
