import { CreatePersonDto } from '@application/dto/createPersonDto.dto';
import { Person } from '@application/schemas/person.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PersonsService {
  constructor(@InjectModel(Person.name) private personModel: Model<Person>) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const createdPerson = new this.personModel(createPersonDto);
    return createdPerson.save();
  }

  async createMany(createPersonDtos: CreatePersonDto[]): Promise<any> {
    try {
      return {
        insertedDocs: await this.personModel.insertMany(createPersonDtos, { ordered: false }),
      };
    } catch (error) {
      return error;
    }
  }

  async countByState(): Promise<{ state: string; count: number }[]> {
    const results = await this.personModel.aggregate([
      {
        $group: {
          _id: '$state',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          state: '$_id',
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    return results;
  }
}
