import mongoose, { Document, Schema,ObjectId } from 'mongoose';

interface Rating {
  serviceRate: number;
  valueMoney: number;
  communication: number;
  planing: number;
}

interface ReviewDocument extends Document {
DestinationId:ObjectId
UserId :ObjectId
  rating: Rating;
  textarea: string;
}

const reviewSchema = new Schema<ReviewDocument>({
    DestinationId: {
        type:mongoose.Types.ObjectId,
        ref:'Destination'
  },
  UserId: {
    type:mongoose.Types.ObjectId,
    ref:'User'
},
  rating: {
    serviceRate: {
      type: Number,
      required: true
    },
    valueMoney: {
      type: Number,
      required: true
    },
    communication: {
      type: Number,
      required: true
    },
    planing: {
      type: Number,
      required: true
    }
  },
  textarea: {
    type: String,
    required: true
  }
});

const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);

export default Review;
