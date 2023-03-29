
import { Request, Response } from "express";

export const category_manage = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        
    }catch (error:any) {
        console.log(error);
        
    }

} 
