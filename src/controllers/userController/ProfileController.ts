import { RequestHandler, Request } from "express";
import {
  bookingDetails,
  profileUpdation,
  bookingDetailsShowsHelper,
  bookingDetailsCancel
} from "../../helper/user/profileUpdation";
import bcrypt from "bcrypt";
import { UserModel } from "../../model/userModel";
import { passwordChange } from "../../helper/user/passwordChange";
interface RequestWithUser extends Request {
  Token?: any;
}

export const userProfileUpdate: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    const userId = req.Token;
    const { fname, lname, address, phone, email } = req.body;
    const { path } = req.file as any;
    const data = {
      fname,
      lname,
      address,
      phone,
      email,
      path,
      userId,
    };
    const userData = await profileUpdation(data);
    res.json({ success: true, userData }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const userPasswordChange: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    const userId = req.Token;
    const { cpassword, conformPassword } = req.body;
    const data = {
      conformPassword,
      userId,
    };

    const userCollection: any = await UserModel.findOne({ _id: userId });

    const match = await bcrypt.compare(cpassword, userCollection?.password);
    if (match) {
      const userpasswordChange = await passwordChange(data);
      res.json({ success: true }).status(200);
    } else {
      res.json({ error: "Incorrect current password.." }).status(401);
      throw new Error("Incorrect current password");
    }
  } catch (error) {
    console.log(error);
  }
};

export const bookingDetailsFetch: RequestHandler = async (
  req: RequestWithUser,
  res
) => {
  try {
    const userId = req.Token;
    const bookingData = await bookingDetails(userId);
    res.json({ success: true,bookingData }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const bookingDetailsShow :RequestHandler = async(req:RequestWithUser,res)=>{
    try {
        const BookingID = req.query.id as string
        const detailsShow = await bookingDetailsShowsHelper(BookingID)
        console.log(detailsShow);
        
        res.json({ success: true,detailsShow }).status(200);
        
    } catch (error) {
        
    }
}

export const bookingCancel : RequestHandler = async(req:RequestWithUser,res)=>{
    try {
        const BookingID = req.query.id as string
      const bookingData =  await bookingDetailsCancel(BookingID)

        res.json({ success: true , bookingData}).status(200);
    } catch (error) {
        
    }
}
