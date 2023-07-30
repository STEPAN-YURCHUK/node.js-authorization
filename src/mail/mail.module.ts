import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				secure: true,
				auth: {
					user: process.env.SMTP_USERNAME,
					pass: process.env.SMTP_PASSWORD,
				},
			},
		}),
	],
	controllers: [],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
