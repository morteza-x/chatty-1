import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { decodeJwt } from "../libs/jwt";
import User from "../models/User";

export const authGuardMid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const token = req?.cookies?.jwt;
  
  if (!token) return res.status(HttpStatusCode.Unauthorized).json({
    msg: 'Unauthorized!',
    success: false,
  })

  // token is expired
  const decoded = decodeJwt(token);
  if (!decoded) {
    // remove token from cookie
    res.clearCookie('jwt', {httpOnly: true});
    
    return res.status(HttpStatusCode.Unauthorized).json({
      msg: 'Unauthorized!',
      success: false,
    })
  }
  //@ts-ignore
  const user = await User.findOne({email: decoded.email});

  //@ts-ignore
  req.user = user;
  next();
}