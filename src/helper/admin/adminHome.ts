import adminModel from '../../model/adminModel'
import BookingModel from '../../model/bookingModel'
import { UserModel } from '../../model/userModel'

export const AdminLoginHelper = async(values:object):Promise<any>=>{
    try {
         const {email} = values as any
         const adminCollection = await adminModel.findOne({email:email})
         return adminCollection
       
    } catch (error) {
        console.log(error);
        
    }
} 

export const fetchBookingCount = async():Promise<any>=>{
    try {
        return  await BookingModel.find().count()
    } catch (error) {
        
    }
}

export const fetchClientsCount = async():Promise<any>=>{
    try {
        return  await UserModel.find().count()
    } catch (error) {
        
    }
}

export const fetchTotalRevenueCount = async():Promise<any>=>{
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
    } catch (error) {
        
    }
}

export const fetchUserDetails = async():Promise<any>=>{
  try {
      return  await UserModel.find()
  } catch (error) {
      
  }
}