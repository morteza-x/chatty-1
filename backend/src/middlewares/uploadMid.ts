import { NextFunction, Request, Response } from "express";
import { LIARA_ACCESS_KEY, LIARA_BUCKET_NAME, LIARA_ENDPOINT, LIARA_SECRET_KEY } from "../config/config";
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { helper } from "../modules/utils/helper";

const config = {
  endpoint: LIARA_ENDPOINT,
  accessKeyId: LIARA_ACCESS_KEY,
  secretAccessKey: LIARA_SECRET_KEY,
  region: 'default',
};

const s3:any = new AWS.S3(config);

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: LIARA_BUCKET_NAME,
    key: function(req:Request, file:any, cb:any) {
      console.log('uploading--file:', file);
      cb(null, helper.getRandomId() + file.originalname );
    },
  })
})