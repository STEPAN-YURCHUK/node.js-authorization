import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/users/models/user.model'
import { UserRole } from './user-role.model'

interface RoleCreationAttrs {
	value: string
	description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'USER', description: 'Название роли' })
	@Column({
		type: DataType.STRING,
		unique: true,
	})
	value: string

	@ApiProperty({
		example: 'Обычный пользователь',
		description: 'Описание роли',
	})
	@Column({
		type: DataType.STRING,
		unique: true,
	})
	description: string

	@BelongsToMany(() => User, () => UserRole)
	users: User[]
}
