import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import csvParser from 'csv-parser';
import { createReadStream } from 'fs';

@Injectable()
export class AppService {
  async uploadCSV(file: Express.Multer.File, client: ClientProxy) {
    return new Promise((resolve, reject) => {
      const batchSize = 1000;
      const results: any[] = [];
      const csvStream = createReadStream(file.path).pipe(csvParser());

      csvStream.on('data', (data) => {
        results.push(data);

        if (results.length % batchSize === 0) {
          csvStream.pause();

          client.emit('person-batch', results.splice(0, batchSize));

          setTimeout(() => {
            csvStream.resume();
          }, 1000);
        }
      });

      csvStream.on('end', () => {
        if (results.length > 0) {
          client.emit('person-batch', results);
        }
        resolve({
          message: 'File uploaded and read',
          exampleEntry: results[0]
        });
      })

      csvStream.on('error', err => {
        reject(err);
      })
    });
  }
}
