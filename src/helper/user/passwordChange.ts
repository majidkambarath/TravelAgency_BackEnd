import bcrypt from 'bcrypt'
import { UserModel } from '../../model/userModel'
const hashPassword = async(password:string)=>{
    try {
        const hash = await bcrypt.hash(password,10)
        return hash
    } catch (error) {
        console.log(error);
        
    }
}
export const passwordChange = async(data:any):Promise<any>=>{
    try {
         const encrypt = await hashPassword(data.conformPassword)

         const passwordUpdate = await UserModel.updateOne(
            {_id:data.userId},
            {$set: {password:encrypt}}
            
            ) 
         return passwordUpdate
    } catch (error) {
        console.log(error);
        
    }
}