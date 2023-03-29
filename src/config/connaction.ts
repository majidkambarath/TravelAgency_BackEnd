import mongoose from "mongoose";
mongoose.set('strictQuery', false)
const mongodb = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://majidkambarth:${process.env.MONGOOES_PASS}@cluster0.7anwm9d.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
            console.log("connection successful");
        }).catch((error)=>{
            console.log("no connected");
            console.log(error);
        })
    } catch (error) {
        console.log(error);
        
    }
}
export default mongodb
