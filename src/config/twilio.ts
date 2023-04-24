import twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config()

const { TWILIO_SERVICE_ID,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN}=process.env
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
 
export const  sendVerificationToken=(mobile:number):Promise<boolean>=>{
    return new Promise((resolve)=>{
        client.verify.
            v2.services(TWILIO_SERVICE_ID as string)
            .verifications
            .create({
                to: `+91${mobile}`,
                channel: "sms"
            }).then((data) => {
                
                resolve(true)

            }).catch((error) => {
                console.log(error);
                
                resolve(false)

            })
    })
}

export const checkVerificationToken=(otp:string,phoneNumber:number):Promise<boolean>=>{
    return new Promise((resolve)=>{
        client.verify.v2
            .services(TWILIO_SERVICE_ID as string)
            .verificationChecks
            .create({
                to: `+91${phoneNumber}`,
                code: otp
            }).then((data) => {
                if (data.valid) { 
                    
                    resolve(true);
                } else {
                    resolve(false)
                }
            }).catch(() => {
                console.log('error');
                resolve(false)
            })
    })
}