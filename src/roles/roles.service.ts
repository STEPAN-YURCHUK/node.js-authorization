import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/users/models/user.model'
import { Role } from './models/role.model'
import { UserRole } from './models/user-role.model'

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		@InjectModel(Role) private roleRepository: typeof Role,
		@InjectModel(UserRole) private userRoleRepository: typeof UserRole,
	) {}

	async create(dto) {
		return this.roleRepository.create(dto)
	}

	async assignRolesToUser(userId, roleId) {
		const user = await this.userRepository.findByPk(userId)
		if (!user) {
			throw new Error('Пользователь не найден.')
		}

		const roles = await this.roleRepository.findOne({
			where: {
				id: roleId,
			},
		})

		if (!roles) {
			throw new Error('Роль не найдена.')
		}

		await user.$add('roles', roles)
	}

	async getAll() {
		return this.roleRepository.findAll()
	}

	async getUserRole() {
		return this.userRoleRepository.findAll()
	}
}
