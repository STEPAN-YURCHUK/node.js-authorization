"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
const user_model_1 = require("../users/models/user.model");
const role_model_1 = require("./models/role.model");
const user_role_model_1 = require("./models/user-role.model");
const roles_controller_1 = require("./roles.controller");
const roles_service_1 = require("./roles.service");
let RolesModule = class RolesModule {
};
RolesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            sequelize_1.SequelizeModule.forFeature([user_model_1.User, role_model_1.Role, user_role_model_1.UserRole]),
        ],
        providers: [roles_service_1.RolesService],
        controllers: [roles_controller_1.RolesController],
        exports: [roles_service_1.RolesService],
    })
], RolesModule);
exports.RolesModule = RolesModule;
//# sourceMappingURL=roles.module.js.map