import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function start() {
	const PORT = process.env.PORT || 3000
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.setTitle('VAPESHOP BACKEND')
		.setDescription('Документация REST API')
		.setVersion('1.0.0')
		.addTag('YURCHUK')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)

	await app.listen(PORT, () => console.log(`SERVER WORK! PORT:${PORT}`))
}
start()
