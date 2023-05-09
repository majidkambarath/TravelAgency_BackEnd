import { ObjectId } from "bson";

export interface IConversation {
    message: string;
    sender:string
    time: Date;
  }
export interface IChat {
    _id?: ObjectId;
    user: ObjectId;
    conversation: IConversation[]
  }
  