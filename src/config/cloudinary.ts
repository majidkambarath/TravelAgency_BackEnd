import cloudinary from "cloudinary"
import dotenv from 'dotenv'
dotenv.config()

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

export = cloudinary.v2 