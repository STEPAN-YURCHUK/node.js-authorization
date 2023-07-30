import { ApiProperty } from '@nestjs/swagger'

export class AddUserRoleDto {
	@ApiProperty({ example: '1', description: 'Id пользователя' })
	readonly userId: number

	@ApiProperty({ example: '1', description: 'Id роли' })
	readonly roleId: number
}
