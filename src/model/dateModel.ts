import { Schema, Document, model } from "mongoose";
interface IDate extends Document {
  date: Date;
  isBooked: boolean;
}
const dateSchema: Schema = new Schema({
  date: { type: Date, required: true, unique: true },
  isBooked: { type: Boolean, required: true, default: false },
});
const DateModel = model<IDate>("Date", dateSchema);
export { IDate, DateModel };
