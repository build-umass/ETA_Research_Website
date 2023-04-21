import { Schema, model, Types } from 'mongoose';
import { ITab } from './tab';

interface IPage {
  content: string;
  tab: ITab;
}

const pageSchema = new Schema<IPage>({
  content: { type: String, required: true },
  tab: Types.ObjectId
});

const Page = model<IPage>('page', pageSchema);

export default Page;
export {
  IPage
}