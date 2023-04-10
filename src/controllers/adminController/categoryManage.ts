
import { Request, Response } from "express";
import {categoryHelper,fetchHelper} from '../../helper/admin/categoryHelper'
export const category_manage = async (req: Request, res: Response) => {
    try {
        const {packageCategory} = req.body;
        const Image = req.file
        const path:string|undefined = Image?.path 
        console.log(path);
      const data = {
        packageCategory,
        path
      }
        await categoryHelper.categoryCreate(data).then(()=>{
           res.status(200).json({success:true})
        })
        
        
    }catch (error:any) {
        console.log(error);
        
    }

} 
export const fetchingData = async(req:Request,res:Response)=>{
    try {
        const fetch = await fetchHelper.fetchCreate()
        console.log(fetch);
        
         res.json({success:true,fetch}).status(200)
    } catch (error) {
        console.log(error);
        
    }
}
