import nodemailer from 'nodemailer'
import { APP_PASSWORD, EMAIL_USER, FRONT_URL } from '../config/config'

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: APP_PASSWORD
  }
})

export function sendEmail(
  recipient: string,
  text: string="",
  subject:string='From Morteza Rostami! ' + FRONT_URL,

) {

  const mailOptions = {
    from: EMAIL_USER,
    to: recipient,
    subject,
    text,
  }

  // send the email
  transporter.sendMail(mailOptions, (error:any, info:any) => {
    if (error) console.error('❌ Error:', error.message);
    else console.log('✅ Email sent:', info.response);
  })
}