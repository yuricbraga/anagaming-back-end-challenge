import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StateCount {
  @Prop({ required: true, unique: true })
  state: string;

  @Prop({ required: true })
  count: number;
}

export const StateCountSchema = SchemaFactory.createForClass(StateCount);
