import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { MailModule } from 'src/mail/mail.module'
import { Role } from 'src/roles/models/role.model'
import { RolesModule } from 'src/roles/roles.module'
import { User } from './models/user.model'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [
		MailModule,
		forwardRef(() => AuthModule),
		RolesModule,
		SequelizeModule.forFeature([User, Role]),
	],
	providers: [UsersService],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
