import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
  const token = req.cookies["auth_token"];
  console.log("token",token)
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
=======
  const token = req.cookies.auth_token;
  console.log("token",token)
   if (!token) {
     return res.status(401).json({ message: "unauthorized" });
   }
>>>>>>> 59730d9dfbcf455dfa05336b99fd44745e5a1ac9

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
     req.userId = (decoded as JwtPayload).userId;
    next();
   } catch (error) {
     return res.status(401).json({ message: "unauthorized" });
   }
};

export default verifyToken;
