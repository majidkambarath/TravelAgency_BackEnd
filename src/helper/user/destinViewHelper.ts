import destinModel from "../../model/destinModel";
export const destinViewHelper = {
    destinViewApi:async(id:string):Promise<any> =>{
        try {
            const destinview = await destinModel.findById({_id:id})
            
          
            return destinview
        } catch (error) {
            console.log(error);
            
        }
    }
}