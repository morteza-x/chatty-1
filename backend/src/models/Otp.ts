import { NextFunction } from "express";
import mongoose, { model } from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // The document will be automatically deleted after 5 minutes of its creation time
    expires: 60 * 5, 
  },
});

// Define a function to send emails
async function sendVerificationEmail(email:string, otp:string) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

//@ts-ignore
otpSchema.pre("save", async function (next: NextFunction) {
  
  try{
    //@ts-ignore
    console.log("New document saved to the database", this.email, this.otp);
    // Only send an email when a new document is created
    if (this.isNew) {
      //await sendVerificationEmail(this.email, this.otp);
    }
  }catch(err:any) {
    console.log(err?.message || err?.stack || err);
  }
  next();
});

export default model<any>('Otp', otpSchema);