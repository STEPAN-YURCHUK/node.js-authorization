import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { MailModule } from 'src/mail/mail.module'
import { Role } from 'src/roles/models/role.model'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		SequelizeModule.forFeature([Role]),
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.SECRET_KEY || 'SECRET',
			signOptions: {
				expiresIn: '24h',
			},
		}),
		MailModule,
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
