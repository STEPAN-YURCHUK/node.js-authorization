import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcryptjs'
import { MailService } from 'src/mail/mail.service'
import { Role } from 'src/roles/models/role.model'
import { CreateUserDto } from 'src/users/dto/create.user.dto'
import { User } from 'src/users/models/user.model'
import { v4 as uuidv4 } from 'uuid'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private mailService: MailService,
		@InjectModel(Role) private roleRepository: typeof Role,
	) {}

	async login(dto: CreateUserDto) {
		const user = await this.validateUser(dto)
		return this.generateToken(user)
	}

	async registration(dto: CreateUserDto) {
		const candidate = await this.usersService.getUserByEmail(dto.email)
		if (candidate) {
			throw new HttpException(
				'Пользователь с таим email существует',
				HttpStatus.BAD_REQUEST,
			)
		}
		const activationLink = uuidv4()
		const hashPassword = await bcrypt.hash(dto.password, 5)
		const user = await this.usersService.createUser({
			...dto,
			password: hashPassword,
			activationLink,
		})
		await this.mailService.sendActivationMail(
			dto.email,
			`${process.env.API_URL}/users/activate/${activationLink}`,
		)
		return this.generateToken(user)
	}

	private async generateToken(user: User) {
		const payload = { email: user.email, id: user.id, roles: user.roles }
		return { access_token: this.jwtService.sign(payload) }
	}

	private async validateUser(dto: CreateUserDto) {
		const user = await this.usersService.getUserByEmail(dto.email)
		const passwordEquals = await bcrypt.compare(dto.password, user.password)
		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({
			message: 'Некорректный Email или Пароль',
		})
	}
}
