import BookingModel from "../../model/bookingModel"

export const bookingManageHelper = async():Promise<object[]|undefined>=>{
    try {
           const bookingManage = await BookingModel.find().populate('userDetails')
          
        return bookingManage
    } catch (error) {
        console.log(error);
        
    }
}