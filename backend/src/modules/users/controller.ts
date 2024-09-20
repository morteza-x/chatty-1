import { Request, Response } from "express";
import User from "../../models/User";
import { HttpStatusCode } from "axios";
import { TUpdateUser } from "../../types/apiTs";

export const usersController = {

  async update(req: Request, res: Response) {
    try{
      const input: TUpdateUser = {
        username: req.body.username,
        file: req.file,
      }
      const {username, file} = input;
      
      // @ts-ignore
      const user = req.user;

      if (!username) return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        msg: 'missing input!',
      })

      const userModel = await User.findOne({email: user.email});

      if (!userModel) return res.status(HttpStatusCode.BadRequest).json({
        status: false,
        msg: 'no user!',
      })

      userModel.username = username;
      //@ts-ignore
      userModel.image = file?.location || null; 
      const updated = await userModel.save();

      return res.status(HttpStatusCode.Created).json({
        success: true,
        msg: 'user updated!',
        user: updated,
      })

    }catch(err:any) {
      return res.status(400).json({
        msg: 'user update failed!',
        error: err?.message || err,
        success: false,
      });
    }
  },
}