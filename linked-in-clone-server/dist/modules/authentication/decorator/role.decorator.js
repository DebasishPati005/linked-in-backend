"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../../../common/constant");
const Role = (...roles) => (0, common_1.SetMetadata)(constant_1.ROLES_KEY, roles);
exports.Role = Role;
//# sourceMappingURL=role.decorator.js.map