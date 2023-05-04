import mongoose, { Document, Model, Schema } from 'mongoose';

 export interface Booking {
    userDetails : {
        name:string|undefined,
        address:string|undefined,
        email:string|undefined,
        phone:number|undefined,
        idCardNumber:string | undefined,
        idCardPhoto:string |undefined
    }
    ArrivedDate: Date;
    Participants: number;
    ArrivedDay: string;
    BookingData: Date;
    BookingDay: string;
    ExtraService: { name: string, price: number }[];
    SubTotal: number;
    Title: string;
    Price: number;
    priceCate: string;
    status:boolean
  }

  const bookingSchema = new Schema<Booking>({
    userDetails:{
      name:String,
      address:String,
      email:String,
      phone:Number,
      idCardNumber:String,
      idCardPhoto:String
    },
    ArrivedDate: { type: Date },
    Participants: { type: Number },
    ArrivedDay: { type: String },
    BookingData: { type: Date },
    BookingDay: { type: String },
    ExtraService: [{ name: String, price: Number }],
    SubTotal: { type: Number },
    Title: { type: String },
    Price: { type: Number },
    priceCate: { type: String },
    status:{
        type:Boolean,
        default:true
    }
  });



const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;