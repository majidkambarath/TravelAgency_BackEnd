import Razorpay from 'razorpay';
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY as string,
    key_secret: process.env.RAZORPAY_SECRET_KEY
  });
  
