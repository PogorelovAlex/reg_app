import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_PASSWORD,
  SMTP_USER,
  API_URL

} from '../consts/secret.const';
class sendEmailService {
   transporter: any;
     constructor(){
       this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure:false,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      }as SMTPTransport.Options)  
     }  
    async sendActivationMail(to: string,link: string){
        await this.transporter.sendMail({
          from:SMTP_USER,
          to,
          subject:`Accaunt activation ${API_URL}`,
          text:'',
          html: `
          <div>
          <h1>For activation visit activation link</h1>
          <a href="${link}">${link}</a>
          </div>
          `
        })
        return link
    }
}
export default  new sendEmailService();