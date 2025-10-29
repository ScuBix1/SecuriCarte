import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IncidentModule } from './incident/incident.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
