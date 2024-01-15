"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImageConfig = void 0;
const multer_1 = require("multer");
const constant_1 = require("./constant");
exports.saveImageConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './user-profile-pictures/',
        filename: (err, file, cb) => {
            const fileName = Date.now() + '-' + file.originalname;
            console.log('saved');
            cb(null, fileName);
        },
    }),
    fileFilter(req, file, callback) {
        const validFileMimeTypes = constant_1.CONSTANTS.validFileMimeTypes;
        const error = new Error(constant_1.CONSTANT_STRINGS.unacceptableFileType);
        return validFileMimeTypes.includes(file.mimetype) ? callback(null, true) : callback(error, false);
    },
};
//# sourceMappingURL=upload-image.js.map