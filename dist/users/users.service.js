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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const mail_service_1 = require("../mail/mail.service");
const role_model_1 = require("../roles/models/role.model");
const roles_service_1 = require("../roles/roles.service");
const user_model_1 = require("./models/user.model");
let UsersService = class UsersService {
    constructor(userRepository, roleRepository, rolesService, mailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.rolesService = rolesService;
        this.mailService = mailService;
    }
    async createUser(dto) {
        const user = await this.userRepository.create(dto);
        await this.rolesService.assignRolesToUser(user.id, 1);
        return await this.userRepository.findOne({
            where: { id: user.id },
            include: [role_model_1.Role],
        });
    }
    async getAllUser() {
        const users = await this.userRepository.findAll({
            include: [role_model_1.Role],
        });
        return users;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return user;
    }
    async activate(activationLink) {
        const user = await this.userRepository.findOne({
            where: { activationLink },
        });
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'Некоректная ссылка активации',
            });
        }
        user.isActivation = true;
        user.save();
        return `Почта ${user.email} подтверждена`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [Object, Object, roles_service_1.RolesService,
        mail_service_1.MailService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map