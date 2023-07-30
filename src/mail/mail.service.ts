import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendActivationMail(to, link) {
		console.log('OK:1')
		await this.mailerService.sendMail({
			from: process.env.SMTP_USERNAME,
			to,
			subject: 'Активация аккаунта на ' + process.env.API_URL,
			text: '',
			html: `
                    <div>
                        <h1>Для активации почты перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
		})
	}
}
