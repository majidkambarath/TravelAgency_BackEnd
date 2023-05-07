import { UserModel } from "../../model/userModel";
import BookingModel from "../../model/bookingModel";
import { Booking } from "../../model/bookingModel";
export const bookingUserCollectionUpdate = async (data: any): Promise<any> => {
  try {
    const prePhone = +data.phone;

    const updateData = {
      first: data.fname,
      last: data.lname,
      address: data.address,
      email: data.email,
      phone: prePhone,
      idCard: {
        number: data.idCard,
        image: data.path,
      },
    };
    const filter = { _id: data.userId };
    const update = { $set: updateData };
    const userCollectionUpdate = await UserModel.updateOne(filter, update);
    return userCollectionUpdate;
  } catch (error) {
    console.log(error);
  }
};

export const bookingCollectionHelper = async (data: any): Promise<any> => {
  try {
    const bookingCollaction = new BookingModel({
      userDetails: data.userID,
      Destination:data.destinId,
      ArrivedDate: data.Arrived,
      Participants: data.Participants,
      BookingData: data.BookingData,
      ExtraService: data.ExtraService,
      SubTotal: data.SubTotal,
      Title: data.Title,
      Price: data.price,
      priceCate: data.priceCate,
    });

    await bookingCollaction.save();
    return bookingCollaction;
  } catch (error) {
    console.log(error);
    
  }
};
