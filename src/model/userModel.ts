import mongoose, { Document, Schema } from 'mongoose';

// Define the user schema
interface IUser extends Document {
  name: string;
  email: string;
  phone:number;
  password: string;

}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type:Number,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the user model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel, IUser };
