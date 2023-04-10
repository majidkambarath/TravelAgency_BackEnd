import destinModel from "../../model/destinModel";
import { RequestHandler } from "express";
import { fetchPackage } from "../../helper/user/packageCateHelper";
export const packageCategory:RequestHandler = async(req,res)=>{
    try {
        const id:any = req.query.id
        console.log(req.query.id);
        const fetch = await fetchPackage.fetchCategoryApi(id)
        res.json({success:true,fetch}).status(200)
        
    } catch (error) {
        console.log(error);
        
    }
}