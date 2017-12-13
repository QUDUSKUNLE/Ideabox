import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const emailAccount = process.env.SECRET_EMAIL;
const emailPassword = process.env.SECRET_PASSWORD;

/**
 * function to send mail
 * @param {string} email
 * @param {string} name
 * @param {string} hash
 * @param {string} headers
 * @return {void}
 */
export default (email, name, hash, headers) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    // secure:true for port 465, secure:false for port 587
    auth: {
      user: emailAccount,
      pass: emailPassword
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"IdeaBox" <ideabox.idea@gmail.com>', // sender address
    to: email,
    subject: 'Reset password', // Subject line
    html: `<body><div>
            <div style="background-color:#f2f3f5;padding:20px">
              <div style="max-width:600px;margin:0 auto">
               <div 
                style="
                  background:#fff;
                  font:14px sans-serif;
                  color:#686f7a;
                  border:2px solid #7AB6FB;
                  margin-bottom:20px">
                <div 
                  style="
                   border-bottom:1px solid #f2f3f5;
                   padding-bottom:20px;
                   padding-top:20px">
                  <h4 
                    style="
                      padding-top:0; 
                      padding-left:20px; 
                      margin:0; 
                      font-size:30px;">
                      IdeaBox</h4>
                </div>
                <div style="padding:30px 20px;line-height:1.5em;color:#686f7a">
                  <p style="color:#737373">Hi ${name},</p>
                  <p 
                    style="
                      padding-bottom:20px;
                      margin:40px 0;
                      color:#686f7a">
                     You have requested to reset your password for IdeaBox account. Please click on the button below to reset your password.
                  </p>
              <p
                 style="position: absolute;left: 50%;
    transform: translate(-50%, -50%)"><a href="http://${headers}/api/v1/users/passwords/${hash}" 
                    style="
                      display:inline-block;
                      font-size:15px;color:#ffffff;
                      padding:10px 15px;
                      text-decoration:none;
                      background-color:#7AB6FB;
                      border-radius:3px" 
                      target="_blank">
                      Reset Password
                  </a>
                  </p>
                  <p 
                    style="
                      padding-bottom:20px;
                      margin-top:100px;
                      color:#686f7a">
                      If you haven't made this request please ignore this message.
                  </p>
                  <p 
                    style="padding-bottom:10px;
                      margin-top:40px;
                      color:#686f7a">
                      Best regards, <br>
                      IdeaBox Team.<br>
                    <a href="https://ideaboxng.herokuapp.com" style="color: #7AB6FB">ideaboxng.herokuapp.com</>
                  </p>
                </div>
             </div>
            </div>
          </body>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return error;
    }
    return true;
  });
};

