import { RequestHandler, Request } from "express";
import { bookingCollectionHelper, bookingUserCollectionUpdate } from "../../helper/user/BookingHelper";
import { instance } from "../../config/razorpay";
import crypto from "crypto";
interface RequestWithUser extends Request {
  Token?: any;
}
export const userDetailsPatch: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    console.log(req.body);

    const userId = req.Token;
    const { fname, lname, address, idCard, phone, email } = req.body;
    const { path } = req.file as any;
    const data = {
      fname,
      lname,
      address,
      idCard,
      phone,
      email,
      path,
      userId,
    };
    await bookingUserCollectionUpdate(data);
    res.json({ success: true }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const paymentProcessing: RequestHandler = async (req, res) => {
  try {
    const { total } = req.body;
    const receiptId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // random reciept id generating
    const options = {
      amount: total * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${receiptId}`,
      payment_capture: 1,
    };
    const order = await instance.orders.create(options);
    if (!order) {
      res.status(401).json({ message: "something went wrong" });
    } else {
      res.status(200).json({
        sucess: true,
        order,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const paymentSuccess: RequestHandler = async (req, res) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body;
    const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY as string)
    .update(`${orderCreationId}|${razorpayPaymentId}`)
    .digest("hex");
    if (signature !== razorpaySignature) {
      
     res.json({message: "Transcation is not legit"}).status(400);
    }else{
      const {Arrived,Participants,ArrivedDay,BookingData,BookingDay,ExtraService,SubTotal,Title,Price,priceCate,userID} = req.body
      const data = {
        Arrived,Participants,ArrivedDay,BookingData,BookingDay,ExtraService,SubTotal,Title,Price,priceCate,userID
      }
      
      const bookingCollection = await bookingCollectionHelper(data)
      res.status(200).json({
        success: true,
      
      });
   
      
    }
   
  } catch (error) {
    console.log(error);
  }
};
