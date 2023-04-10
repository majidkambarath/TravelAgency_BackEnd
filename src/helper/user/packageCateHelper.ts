import destinModel from "../../model/destinModel";

export const fetchPackage = {
    fetchCategoryApi:async(id:string):Promise<any> =>{
       try {
        const fetchPackageData = await destinModel.find({packageCategory:id})
        return fetchPackageData
       } catch (error) {
        console.log(error);
        
       }
    }
}