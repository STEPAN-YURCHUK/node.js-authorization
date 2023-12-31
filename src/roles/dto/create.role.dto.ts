import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
	@ApiProperty({ example: 'USER', description: 'Название роли' })
	readonly value: string

	@ApiProperty({
		example: 'Обычный пользователь',
		description: 'Описани роли',
	})
	readonly description: string
}
