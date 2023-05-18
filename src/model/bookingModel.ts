import mongoose, { Document, Model, Schema , ObjectId } from 'mongoose';

 export interface Booking {
    userDetails : ObjectId
    Destination:ObjectId
    ReviewId : ObjectId
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
    BookingStatus:string
  }

  const bookingSchema = new Schema<Booking>({
    userDetails:{
      type:mongoose.Types.ObjectId,
      ref:'User'
    },
    Destination :{
      type:mongoose.Types.ObjectId,
      ref:'Destination'
    },
    ReviewId :{
      type:mongoose.Types.ObjectId,
      ref:'Review'
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
    },
    BookingStatus:{
      type:String,
      default:'Success'
  },
  });



const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;