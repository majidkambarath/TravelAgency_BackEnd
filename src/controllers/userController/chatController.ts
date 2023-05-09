import { RequestHandler } from "express";
import { chatUserLisitHelper, conversationsHelper, messageHelperApi } from "../../helper/chat/chatHelper";


export const conversationsStore :RequestHandler = async(req,res)=>{
    try {
        const id = req.query.id as string
        const {message,sender} = req.body
       await conversationsHelper(id,message,sender)
       res.json({ success: true }).status(200);
     
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const chatUserLisit :RequestHandler = async(req,res)=>{
    try {
        const uselisit = await chatUserLisitHelper()
        res.json({ success: true ,uselisit}).status(200);
    } catch (error) {
      console.log(error);
        
    }
}


export const fetchMessageDetails :RequestHandler = async(req,res)=>{
    try {
        const id = req.query.id as string
        const result = await messageHelperApi(id)
        res.json({ success: true ,result}).status(200);
        
        
    } catch (error) {
        console.log(error);
        
    }
}