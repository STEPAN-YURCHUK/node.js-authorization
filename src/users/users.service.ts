import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { MailService } from 'src/mail/mail.service'
import { Role } from 'src/roles/models/role.model'
import { RolesService } from 'src/roles/roles.service'
import { User } from './models/user.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		@InjectModel(Role) private roleRepository: typeof Role,
		private rolesService: RolesService,
		private mailService: MailService,
	) {}

	async createUser(dto) {
		const user = await this.userRepository.create(dto)
		await this.rolesService.assignRolesToUser(user.id, 1)

		return await this.userRepository.findOne({
			where: { id: user.id },
			include: [Role],
		})
	}

	async getAllUser() {
		const users = await this.userRepository.findAll({
			include: [Role],
		})
		return users
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: { all: true },
		})
		return user
	}

	async activate(activationLink) {
		const user = await this.userRepository.findOne({
			where: { activationLink },
		})
		if (!user) {
			throw new UnauthorizedException({
				message: 'Некоректная ссылка активации',
			})
		}
		user.isActivation = true
		user.save()
		return `Почта ${user.email} подтверждена`
	}
}
