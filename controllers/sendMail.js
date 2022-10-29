// sendinblue mailer
import Sib from 'sib-api-v3-sdk'
import {errorHandler} from "./helper.js";

const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const host = 'http://localhost:3000/api'

const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email: 'whytrno@gmail.com',
    name: 'Admin mini shop',
}

const verification = async (receivers, req) => {
    await tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Hallo {{params.name}}, please verify your email to login at Mini Shop',
            textContent: `
                    Hallo
                `,
            htmlContent: `
                    <h1>Please click link bellow to verify your email</h1>
                    <a href="${host}/users/verify?token={{params.token}}">Visit</a>
                `,
            params: {
                name: req.user.name,
                token: req.user.refreshToken
            },
        })
}

export const sendMail = async (req, res) => {
    const receivers = [
        {
            email: req.user.email,
        },
    ]
    try{
        if(req.type === 'verification'){
            await verification(receivers, req)
            console.log(req)
            console.log('Email has been sent')
        }
    }catch(error){
        res.status(500).json({
            status: 'error',
            message: errorHandler(error)
        })
    }
}