import { Module } from '@nestjs/common';
import { ConsumerController } from '@application/controllers/consumer.controller';
import { PersonsService } from '@application/services/persons.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './schemas/person.schema';
import { StateCount, StateCountSchema } from './schemas/stateCount.schema';
import { StateCountsService } from './services/stateCounts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Person.name,
        schema: PersonSchema,
      },
      {
        name: StateCount.name,
        schema: StateCountSchema,
      },
    ]),
  ],
  controllers: [ConsumerController],
  providers: [PersonsService, StateCountsService],
})
export class ApplicationModule {}
