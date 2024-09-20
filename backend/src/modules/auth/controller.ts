import { HttpStatusCode } from "axios";
import { Request, Response, response } from "express";
import User from "../../models/User";
import otpGenerator from 'otp-generator';
import Otp from "../../models/Otp";
import { generateJwt } from "../../libs/jwt";
import { TLogin, TRegister } from "../../types/apiTs";
import { generateFromEmail, generateUsername } from "unique-username-generator";
import { sendEmail } from "../../libs/sendEmail";

export const authController = {

  async register(req: Request, res: Response) {
    try{
      const {
        email,
      }: TRegister = req.body;

      if (!email) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          msg: 'missing input!',
        });
      }

      const oldUser = await User.findOne({email});

      //==========Otp creation===========
      let otpCode = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      let oldOtp = await Otp.findOne({ otp: otpCode });

      while (oldOtp) {
        otpCode = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        oldOtp = await Otp.findOne({ otp: otpCode });
      }

      const otpPayload = { email, otp: otpCode };

      const newOtp = await Otp.create(otpPayload);
      //==========================
        console.log('OTP', newOtp.otp);
      // there is a user
      if (oldUser) {
        // send email
        sendEmail(
          // @ts-ignore
          oldUser?.email,
          'Enter this code: ' + newOtp.otp,
        );
        
        return res.status(HttpStatusCode.Ok).json({
          success: false,
          msg: 'User is already registered!',
          //otp: newOtp,
          user: oldUser,
        });
      }
      else {
        // no user

        // random username
        const randomUsername = await generateFromEmail(
          email,
          4
        );

        // create a user
        const user = await User.create({
          email,
          username: randomUsername, 
        });
        
        // send email
        sendEmail(
          // @ts-ignore
          user?.email,
          'Enter this code: ' + newOtp.otp,
        );
        
        return res.status(HttpStatusCode.Created).json({
          msg: 'register!',
          //otp: newOtp,
          user: user,
        });
      }
    }catch(err:any) {
      return res.status(400).json({
        msg: 'register failed!',
        error: err?.message || err,
      });
    }
  },
  
  async login(req: Request, res: Response) {
    try{
      const {
        otp,
        email,
      }: TLogin = req.body;

      if (!email || !otp) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          msg: 'missing input!',
        });
      }

      // check if: there is such a user and otp is valid
      const user = await User.findOne({email});
      if (!user) return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        msg: 'no such user!',
      });
      
      // find the most recent Otp
      const otps = await Otp.find({email}).sort({createdAt: -1}).limit(1);
      if (otps.length === 0 || otp !== otps[0].otp) {
        return res.status(HttpStatusCode.Unauthorized).json({
          success: false,
          msg: 'otp not valid!',
        })
      }

      // generate token and send it in http only cookie
      const token = generateJwt(user);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // One month in milliseconds
      })
        
      return res.status(HttpStatusCode.Created).json({
        msg: 'login!',
        success: true,
      });
    }catch(err:any) {
      return res.status(400).json({
        msg: 'login failed!',
        error: err?.message || err,
      });
    }
  },

  async getAuth(req: Request, res: Response) {
    try{
      //@ts-ignore
      const user = req.user;
        
      return res.status(HttpStatusCode.Created).json({
        msg: 'authUser!',
        user: user.toObject(),
        success: true,
      });
    }catch(err:any) {
      return res.status(HttpStatusCode.Ok).json({
        msg: 'authUser failed!',
        error: err?.message || err,
        user: null,
        success: false,
      });
    }
  },

  async logout(req: Request, res: Response) {
    try{
      //@ts-ignore
      //const user = req.user;
        
      res.clearCookie('jwt', {httpOnly: true});

      res.status(HttpStatusCode.Ok).json({
        success: true,
        msg: 'logout!'
      })

    }catch(err:any) {
      return res.status(400).json({
        msg: 'authUser failed!',
        error: err?.message || err,
        success: false,
      });
    }
  },
}