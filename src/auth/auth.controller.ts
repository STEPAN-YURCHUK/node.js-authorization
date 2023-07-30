import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create.user.dto'
import { User } from 'src/users/models/user.model'
import { AuthService } from './auth.service'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Авторизация пользователя' })
	@ApiResponse({ status: 200, type: User })
	@Post('login')
	async login(@Body() dto: CreateUserDto) {
		return this.authService.login(dto)
	}

	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiResponse({ status: 200, type: User })
	@Post('registration')
	async registration(@Body() dto: CreateUserDto) {
		return this.authService.registration(dto)
	}
}
