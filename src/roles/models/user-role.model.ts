import { ApiProperty } from '@nestjs/swagger'
import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/users/models/user.model'
import { Role } from './role.model'

@Table({ tableName: 'userRole' })
export class UserRole extends Model<UserRole> {
	@ApiProperty({ example: '1', description: 'Id пользователя ' })
	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
	})
	userId: number

	@ApiProperty({ example: '1', description: 'Id роли ' })
	@ForeignKey(() => Role)
	@Column({
		type: DataType.INTEGER,
	})
	roleId: number
}
