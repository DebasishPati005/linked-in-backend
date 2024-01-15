"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const env_1 = require("./env/env");
const swagger_1 = require("@nestjs/swagger");
const constant_1 = require("./common/constant");
const path_1 = require("path");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const apiLogStream = fs.createWriteStream('api.log', { flags: 'a' });
new env_1.Environment().setConfig();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use('/images', express.static((0, path_1.join)(__dirname, '..', 'user-profile-pictures')));
    const config = new swagger_1.DocumentBuilder()
        .setTitle(constant_1.CONSTANT_STRINGS.swaggerTitle)
        .setDescription(constant_1.CONSTANT_STRINGS.swaggerDescription)
        .setVersion(constant_1.CONSTANT_STRINGS.swaggerVersion)
        .addTag(constant_1.CONSTANT_STRINGS.swaggerTag)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.use(morgan('tiny', { stream: apiLogStream }));
    console.log("app has started");
    await app.listen(process.env.SERVER_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map