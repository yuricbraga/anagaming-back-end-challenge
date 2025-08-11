import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CSV_PROCESS_SERVICE_RABBITMQ } from './constants';

const {
  RABBITMQ_USERNAME = 'guest',
  RABBITMQ_PASSWORD = 'guest',
  RABBITMQ_URI = 'rabbitmq',
  RABBITMQ_PORT = '5672',
  RABBITMQ_QUEUE_NAME = 'csv_process',
} = process.env;

const RABBITMQ_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_URI}:${RABBITMQ_PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CSV_PROCESS_SERVICE_RABBITMQ,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: RABBITMQ_QUEUE_NAME,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
