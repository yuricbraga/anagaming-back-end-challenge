import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const {
  RABBITMQ_USERNAME = 'guest',
  RABBITMQ_PASSWORD = 'guest',
  RABBITMQ_URI = 'rabbitmq',
  RABBITMQ_PORT = '5672',
  RABBITMQ_QUEUE_NAME = 'csv_process',
} = process.env;

const RABBITMQ_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_URI}:${RABBITMQ_PORT}`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: RABBITMQ_QUEUE_NAME,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
