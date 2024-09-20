import { Request, Response } from "express";
import User from "../../models/User";
import { HttpStatusCode } from "axios";
import Notification from "../../models/Notification";
import { TNotificationRead } from "../../types/apiTs";

export const notificationsController = {

  async gets(req: Request, res: Response) {
    try{
      // @ts-ignore
      const user = req.user;
      const notifications = await Notification.find({receiver: user._id})
        .populate({
          path: 'sender',
          model: 'User',
        })
        .sort({createdAt: -1})//descending
        .limit(10);

      return res.status(HttpStatusCode.Created).json({
        success: true,
        msg: 'get notifications!',
        results: notifications,
      })
    }catch(err:any) {
      return res.status(HttpStatusCode.BadRequest).json({
        msg: 'get notifications failed!',
        error: err?.message || err,
        success: false,
      });
    }
  },

  // set as read
  async read(req: Request, res: Response) {
    const {notificationId}: TNotificationRead = req.body; 

    try{
      // @ts-ignore
      //const user = req.user;
      const notification = await Notification.findOne({
        _id: notificationId,
      });

      if (!notification) return res.status(HttpStatusCode.BadRequest).json({
        success: false,
        msg: 'no notification!'
      })

      notification.isRead = true;
      const updated = await notification.save();

      return res.status(HttpStatusCode.Created).json({
        success: true,
        msg: 'set notification read!',
        results: updated,
      })
    }catch(err:any) {
      return res.status(400).json({
        msg: 'set notification read failed!',
        error: err?.message || err,
        success: false,
      });
    }
  },
}