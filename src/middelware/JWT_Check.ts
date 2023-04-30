import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { UserModel } from "../model/userModel";

interface RequestWithUser extends Request {
  headers: any;
  Token?: any;
}

export const JWT_Check = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if (typeof decoded !== "string") {
        const user = await UserModel.findById(decoded.id);
        if (!user) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          req.Token = user;
          next();
        }
      }
    } else {
      res.status(401).json({ message: "No authorization" });
    }
  } catch (error) {
    next(error);
  }
});
