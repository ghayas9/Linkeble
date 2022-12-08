const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { CLIENT_ID , CLEINT_SECRET , REDIRECT_URI ,REFRESH_TOKEN ,owner_email} = require('../../Config/config')
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
    );
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


module.exports = {
    sendOTPbyEmail:new Promise(async(resolve, reject)=>{
        try{
            const accessToken = await oAuth2Client.getAccessToken();
            const transport = nodemailer.createTransport({
            service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: owner_email,
                    clientId: CLIENT_ID,
                    clientSecret: CLEINT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            });
            const mailOptions = {
              from: `Linkable <${owner_email}>`,
              to: email,
              subject: 'Forget Password',
              text: 'Forget Password',
              html: `<div>
                        <div style="color:gray;padding:25px text-align:center">
                        </div>
                        <h1 style='padding:25px; color:blue' >${OTP}</h1>
                    </div>`
            };
    
             await transport.sendMail(mailOptions)
             resolve({
                success:true,
                message:'Email has been sent successfully'
             })
        }catch(err){
            reject({
                success:false,
                err
            })
        }
    })}
