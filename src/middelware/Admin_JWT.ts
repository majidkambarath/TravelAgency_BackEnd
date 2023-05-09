import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import adminModel from "../model/adminModel";

interface RequestWithUser extends Request {
  headers: any;
  Token?: any;
}

export const JWT_CheckAdmin = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if (typeof decoded !== "string") {
        const admin = await adminModel.findById(decoded.id);
        const adminID = admin?._id
        if (!admin) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          req.Token = adminID;
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
