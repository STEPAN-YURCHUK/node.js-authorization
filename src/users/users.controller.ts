import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { RoleGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles-auth.decorator'
import { CreateUserDto } from './dto/create.user.dto'
import { User } from './models/user.model'
import { UsersService } from './users.service'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 200, type: User })
	@Roles('ADMIN')
	@UseGuards(RoleGuard)
	@Post('createUser')
	async createUser(@Body() dto: CreateUserDto) {
		return this.userService.createUser(dto)
	}

	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles('ADMIN')
	@UseGuards(RoleGuard)
	@Get('getAllUsers')
	async getAll() {
		return this.userService.getAllUser()
	}

	@Get('activate/:link')
	async activate(@Param('link') activationLink: string) {
		return await this.userService.activate(activationLink)
	}
}
