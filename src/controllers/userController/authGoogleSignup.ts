import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../../model/userModel";
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

const googleClient = new OAuth2Client({
  clientId: `${process.env.REACT_GOOGLE_CLIENTID}`,
  clientSecret: `${process.env.REACT_GOOGLE_CLIENT_SECRET}`,
});

export const authenticateUser: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: `${process.env.REACT_GOOGLE_CLIENTID}`,
    });
    const payload = ticket.getPayload();

    let user = await UserModel.findOne({ email: payload?.email });
    if (!user) {
      user = await new UserModel({
        email: payload?.email,
        name: payload?.name,
        profile: payload?.picture,
      });
      await user.save();
      res.json({ user, token, action: true });
    }else{
        res.json({ user, token, status: true });
    }
   
  } catch (error) {
    console.log(error);
  }
}; 
