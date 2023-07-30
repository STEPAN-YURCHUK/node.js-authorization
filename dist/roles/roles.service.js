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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../users/models/user.model");
const role_model_1 = require("./models/role.model");
const user_role_model_1 = require("./models/user-role.model");
let RolesService = class RolesService {
    constructor(userRepository, roleRepository, userRoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async create(dto) {
        return this.roleRepository.create(dto);
    }
    async assignRolesToUser(userId, roleId) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new Error('Пользователь не найден.');
        }
        const roles = await this.roleRepository.findOne({
            where: {
                id: roleId,
            },
        });
        if (!roles) {
            throw new Error('Роль не найдена.');
        }
        await user.$add('roles', roles);
    }
    async getAll() {
        return this.roleRepository.findAll();
    }
    async getUserRole() {
        return this.userRoleRepository.findAll();
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __param(2, (0, sequelize_1.InjectModel)(user_role_model_1.UserRole)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map