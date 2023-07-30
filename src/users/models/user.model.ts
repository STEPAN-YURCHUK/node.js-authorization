import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { Role } from 'src/roles/models/role.model'
import { UserRole } from 'src/roles/models/user-role.model'

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адрес' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string

	@ApiProperty({ example: '12345678', description: 'Пароль' })
	@Column({
		type: DataType.STRING,
	})
	password: string

	@ApiProperty({
		example: 'true',
		description: 'Активирован пользователь или нет',
	})
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	isActivation: boolean

	@ApiProperty({
		example: 'iuwqrwoqmfw',
		description: 'Ссылка на активацию',
	})
	@Column({
		type: DataType.STRING,
	})
	activationLink: string

	@BelongsToMany(() => Role, () => UserRole)
	roles: Role[]
}
