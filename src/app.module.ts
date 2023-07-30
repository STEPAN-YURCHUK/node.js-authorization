import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { Role } from './roles/models/role.model'
import { UserRole } from './roles/models/user-role.model'
import { RolesModule } from './roles/roles.module'
import { User } from './users/models/user.model'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: 5432,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, Role, UserRole],
			autoLoadModels: true,
		}),
		MailerModule.forRoot({
			transport: {
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				auth: {
					user: process.env.SMTP_USERNAME,
					pass: process.env.SMTP_PASSWORD,
				},
			},
		}),
		UsersModule,
		RolesModule,
		AuthModule,
		MailModule,
	],
})
export class AppModule {}
