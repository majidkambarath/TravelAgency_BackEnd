import mongoose, { Document, Schema } from 'mongoose';

// Define the user schema
interface IUser extends Document {
  name: string;
  email: string;
  phone:number;
  password: string;
  profile:string;
  first:string;
  last:string;
  address:string;
  idCard:{
    number:string,
    image:string
  }
  action:boolean

}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
   
  },
  phone:{
    type:Number,
    unique:true
  },
  password: {
    type: String,
  },
  profile:{
    type: String
  },
  first:{
    type:String,
  },
  last:{
    type:String
  },
  address:{
    type:String
  },
  idCard:{
    number:String,
    image:String
  },
  action:{
    type:Boolean,
    default:true
  }
});

// Create the user model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export { UserModel, IUser };
