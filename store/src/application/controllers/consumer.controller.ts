import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('consumer')
export class ConsumerController {
  private readonly logger = new Logger(ConsumerController.name);

  @MessagePattern('Csv_Process')
  async receiveFromQueue(@Payload() payload: any): Promise<string> {
    if (!Array.isArray(payload)) {
      this.logger.error('Invalid payload: expected an array.');
      throw new Error('Invalid payload: expected an array.');
    }

    const batch = payload.slice(0, 1000);

    this.logger.log(`Processing batch of size ${batch.length}`);
    this.logger.debug(`Batch content: ${JSON.stringify(batch, null, 2)}`);

    return `Processed batch of size ${batch.length}`;
  }
}
