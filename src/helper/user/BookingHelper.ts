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
    const userData = await UserModel.findOne({ _id: data.userID });
    const idCard = userData?.idCard.number;
    const idCardImage = userData?.idCard.image;
    const bookingCollaction = new BookingModel({
      userDetails: {
        name: userData?.name,
        email: userData?.email,
        phone: userData?.phone,
        address: userData?.address,
        idCardNumber: idCard,
        idCardPhoto: idCardImage,
      },
      ArrivedDate: data.Arrived,
      Participants: data.Participants,
      ArrivedDay: data.ArrivedDay,
      BookingData: data.BookingData,
      BookingDay: data.BookingDay,
      ExtraService: data.ExtraService,
      SubTotal: data.SubTotal,
      Title: data.Title,
      Price: data.price,
      priceCate: data.priceCate,
    });

    await bookingCollaction.save();
    return bookingCollaction;
  } catch (error) {}
};
