import cloudinary from "../config/cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import AppError from "./appError";

interface Params {
  folder: string;
}

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "TravelAgency/services",
  } as Params,
});

const uploadCloudinary = multer({
    storage:cloudStorage,
    //image validation
    fileFilter:(req:Request,file:{mimetype:string},callback)=>{
        if( ['image/jpeg','image/jpg','image/png'].includes(file.mimetype)){
            callback(null,true)
        }
        else{
            return callback( new AppError(400,'only jpg jpeg png and gif files are allowed '));
        }
    }
})

export default uploadCloudinary