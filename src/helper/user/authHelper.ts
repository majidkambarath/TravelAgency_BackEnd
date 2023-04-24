import { UserModel, IUser } from "../../model/userModel";
export const userCollection = {
  userHelper: async (values: any): Promise<any> => {
    try {
      const existData = await UserModel.findOne({ phone: values.phone });
      console.log(existData);

      if (!existData) {
        const authCollection = new UserModel({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.encrypt,
        });
        await authCollection.save();
        return authCollection;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      // throw new Error (error.message as string)
    }
  },
};

export const authLoginHelper = async(email:string):Promise<any> =>{
  try {
     const authLogin = await UserModel.findOne({email:email})
     return authLogin
  } catch (error) {
    console.log(error);
    
  }
}