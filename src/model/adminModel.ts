import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
  email: string;
  password: string;
}

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAdmin>('Admin', AdminSchema);
