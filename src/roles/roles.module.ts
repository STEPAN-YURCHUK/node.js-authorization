import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { User } from 'src/users/models/user.model'
import { Role } from './models/role.model'
import { UserRole } from './models/user-role.model'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'

@Module({
	imports: [
		forwardRef(() => AuthModule),
		SequelizeModule.forFeature([User, Role, UserRole]),
	],
	providers: [RolesService],
	controllers: [RolesController],
	exports: [RolesService],
})
export class RolesModule {}
