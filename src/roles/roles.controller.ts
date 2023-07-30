import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RoleGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles-auth.decorator'
import { CreateRoleDto } from './dto/create.role.dto'
import { AddUserRoleDto } from './dto/create.userrole.dto'
import { Role } from './models/role.model'
import { RolesService } from './roles.service'

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
	constructor(private rolesService: RolesService) {}

	@ApiOperation({ summary: 'Создание роль' })
	@ApiResponse({ status: 200, type: Role })
	@Roles('ADMIN')
	@UseGuards(RoleGuard)
	@Post('createRole')
	async createRole(@Body() dto: CreateRoleDto) {
		return this.rolesService.create(dto)
	}

	@ApiOperation({ summary: 'Присваивание роли' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RoleGuard)
	@Post('addRole')
	async addRole(@Body() dto: AddUserRoleDto) {
		return this.rolesService.assignRolesToUser(dto.userId, dto.roleId)
	}

	@ApiOperation({ summary: 'Получение всех ролей' })
	@ApiResponse({ status: 200, type: [Role] })
	@Roles('ADMIN')
	@UseGuards(RoleGuard)
	@Get('getAllRoles')
	async getAll() {
		return this.rolesService.getAll()
	}
}
