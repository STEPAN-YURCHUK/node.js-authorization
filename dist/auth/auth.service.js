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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcryptjs");
const mail_service_1 = require("../mail/mail.service");
const role_model_1 = require("../roles/models/role.model");
const uuid_1 = require("uuid");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, mailService, roleRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.roleRepository = roleRepository;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }
    async registration(dto) {
        const candidate = await this.usersService.getUserByEmail(dto.email);
        if (candidate) {
            throw new common_1.HttpException('Пользователь с таим email существует', common_1.HttpStatus.BAD_REQUEST);
        }
        const activationLink = (0, uuid_1.v4)();
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.usersService.createUser(Object.assign(Object.assign({}, dto), { password: hashPassword, activationLink }));
        await this.mailService.sendActivationMail(dto.email, `${process.env.API_URL}/users/activate/${activationLink}`);
        return this.generateToken(user);
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return { access_token: this.jwtService.sign(payload) };
    }
    async validateUser(dto) {
        const user = await this.usersService.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new common_1.UnauthorizedException({
            message: 'Некорректный Email или Пароль',
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map