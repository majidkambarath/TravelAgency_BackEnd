import {sign,JwtPayload} from 'jsonwebtoken'
import {ObjectId} from 'bson'
import dotenv from 'dotenv'
dotenv.config()
function createToken(id:ObjectId):string|JwtPayload{
    return sign({id},process.env.JWT_SECRET as string,{expiresIn:'2d'})
}
export {createToken}
