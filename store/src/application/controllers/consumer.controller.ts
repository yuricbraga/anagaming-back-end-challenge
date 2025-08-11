import { PersonsService } from '@application/services/persons.service';
import { StateCountsService } from '@application/services/stateCounts.schema';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('consumer')
export class ConsumerController {
  private readonly logger = new Logger(ConsumerController.name);

  constructor(
    private readonly personService: PersonsService,
    private readonly stateCountService: StateCountsService,
  ) {}

  @MessagePattern('person-batch')
  async receiveFromQueue(@Payload() payload: any): Promise<any> {
    if (!Array.isArray(payload)) {
      this.logger.error('Invalid payload: expected an array.');
      throw new Error('Invalid payload: expected an array.');
    }

    const batch = payload.slice(0, 1000);

    const result = await this.personService.createMany(batch);

    this.logger.log({
      result: `${result?.insertedDocs?.length ?? 0} successful insertions`,
      errors: `${result?.writeErrors?.length ?? 0} insertions failed`,
    });

    const stateCount = await this.personService.countByState();
    await this.stateCountService.upsertMany(stateCount);
  }
}
