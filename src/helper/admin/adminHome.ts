import mongoose from "mongoose";
import adminModel from "../../model/adminModel";
import BookingModel from "../../model/bookingModel";
import { UserModel } from "../../model/userModel";

export const AdminLoginHelper = async (values: object): Promise<any> => {
  try {
    const { email } = values as any;
    const adminCollection = await adminModel.findOne({ email: email });
    return adminCollection;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookingCount = async (): Promise<any> => {
  try {
    return await BookingModel.find().count();
  } catch (error) {}
};

export const fetchClientsCount = async (): Promise<any> => {
  try {
    return await UserModel.find().count();
  } catch (error) {}
};

export const fetchTotalRevenueCount = async (): Promise<any> => {
  try {
    const totalRevenue = await BookingModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$SubTotal" },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    return totalRevenue[0].total;
  } catch (error) {}
};

export const fetchUserDetails = async (): Promise<any> => {
  try {
    return await UserModel.find();
  } catch (error) {}
};

export const fetchBookingDateAndTotal = async (): Promise<
  object | undefined
> => {
  try {
    const bookingData = await BookingModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$BookingData" } },
          totalAmount: { $sum: "$SubTotal" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return bookingData;
  } catch (error) {
    console.log(error);
  }
};

export const adminDashboardBookingReport = async (): Promise<
  object | undefined
> => {
  try {
    const mostBookedDestinations = await BookingModel.aggregate([
      {
        $lookup: {
          from: "Destinations",
          localField: "Destination",
          foreignField: "_id",
          as: "destinationDetails",
        },
      },
      {
        $group: {
          _id: "$Destination",
          destinationName: { $first: "$Title" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    console.log(mostBookedDestinations);

    return mostBookedDestinations;
  } catch (error) {
    console.log(error);
  }
};

export const userBlockORUnblockingHelper = async (id: string): Promise<any> => {
  try {
    const userId = new mongoose.Types.ObjectId(id);
    const userBlock = await UserModel.findOne({ _id: userId });
    if (userBlock?.action === true) {
      await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { action: false }}
      );
      return false;
    } else {
      await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { action: true } }
      );
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
