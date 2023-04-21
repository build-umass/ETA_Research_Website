import { Schema, model } from 'mongoose';

interface ITab {
  name: string;
}

const tabSchema = new Schema<ITab>({
  name: { type: String, required: true }
});

const Tab = model<ITab>('tab', tabSchema);

export default Tab;