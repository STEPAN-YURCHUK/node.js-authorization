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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_guard_1 = require("../auth/role.guard");
const roles_auth_decorator_1 = require("../auth/roles-auth.decorator");
const create_role_dto_1 = require("./dto/create.role.dto");
const create_userrole_dto_1 = require("./dto/create.userrole.dto");
const role_model_1 = require("./models/role.model");
const roles_service_1 = require("./roles.service");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async createRole(dto) {
        return this.rolesService.create(dto);
    }
    async addRole(dto) {
        return this.rolesService.assignRolesToUser(dto.userId, dto.roleId);
    }
    async getAll() {
        return this.rolesService.getAll();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание роль' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: role_model_1.Role }),
    (0, common_1.Post)('createRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "createRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Присваивание роли' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_auth_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.Post)('addRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_userrole_dto_1.AddUserRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "addRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение всех ролей' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [role_model_1.Role] }),
    (0, roles_auth_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, common_1.Get)('getAllRoles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAll", null);
RolesController = __decorate([
    (0, swagger_1.ApiTags)('Роли'),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map