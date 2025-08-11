import { CreateStateCountDto } from '@application/dto/createStateCountDto.dto';
import { StateCount } from '@application/schemas/stateCount.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StateCountsService {
  constructor(@InjectModel(StateCount.name) private StateCountModel: Model<StateCount>) {}

  async upsertMany(createStateCountDtos: CreateStateCountDto[]) {
    const operations = createStateCountDtos.map(({ state, count }) => ({
      updateOne: {
        filter: { state },
        update: {state, count},
        upsert: true
      },
    }));

    return this.StateCountModel.bulkWrite(operations);
  }
}
