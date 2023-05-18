import { RequestHandler ,Request} from "express";
import { DeleteTheReview, FetchTheReview, destinfetchHelper, postReviewData, updateTheReview } from "../../helper/user/reviewHelper";
import Review from "../../model/reviewModel";
interface RequestWithUser extends Request {
    Token?: any;
  }
export const fetchDestinDetails :RequestHandler = async(req:RequestWithUser ,res)=>{
    try {
        const  userId = req.Token;
        const fetch = await destinfetchHelper(userId)
        // console.log(fetch);
        
        res.json({ success: true, fetch}).status(200);
        
    } catch (error) {
        console.log(error);
        
    }
}

export const postReviewController :RequestHandler = async(req:RequestWithUser,res)=>{
    try {
        const  userId = req.Token;
        const {id,rating,textarea} = req.body
        const {serviceRate,valueMoney,communication,planing} = rating
        const data = {id,userId,textarea, serviceRate, valueMoney, communication, planing }
      const review =  await postReviewData(data)
      console.log(review);
      
        // const fetch = await Review.find({UserId:userId})
       
        
       res.json({ success: true}).status(200);
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const patchTheReviewCollection :RequestHandler = async(req,res)=>{
    try {
        const {id,rating} = req.body
        const textarea = req.body.update
        const {serviceRate,valueMoney,communication,planing} = rating
        const data = {id,textarea, serviceRate, valueMoney, communication, planing }
        await updateTheReview(data)
        res.json({ success: true}).status(200);
    } catch (error) {
        console.log(error);
        
    }
}

export const DeleteTheReviewCollection :RequestHandler = async(req,res)=>{
    try {
        const id = req.query.id as string
        await DeleteTheReview(id)
        res.json({ success: true}).status(200);
    } catch (error) {
        console.log(error);
        
    }
}

export const FetchReviewCollection :RequestHandler = async(req,res)=>{
    try {
        const fetch = await FetchTheReview()
        res.json({ success: true,fetch}).status(200);
    } catch (error) {
        console.log(error);
        
    }
}