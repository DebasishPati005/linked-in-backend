"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const dotenv = require("dotenv");
class Environment {
    setConfig() {
        dotenv.config({ path: this.getEnvFilePath() });
    }
    getEnvFilePath() {
        let envFilePath = './src/env/dev.env';
        if (process.env.NODE_ENV === 'dev') {
            envFilePath = './src/env/test.env';
        }
        else if (process.env.NODE_ENV === 'prod') {
            envFilePath = './src/env/prod.env';
        }
        return envFilePath;
    }
}
exports.Environment = Environment;
//# sourceMappingURL=env.js.map