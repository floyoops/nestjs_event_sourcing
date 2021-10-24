import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { UiModule } from '@ui/ui.module';

async function bootstrap() {
  const app = await NestFactory.create(UiModule);
  await app.listen(3000);
}
bootstrap();
