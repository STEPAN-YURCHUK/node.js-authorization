import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адрес' })
	@IsEmail()
	readonly email: string

	@IsNotEmpty()
	@ApiProperty({ example: '12345678', description: 'Пароль' })
	readonly password: string
}
