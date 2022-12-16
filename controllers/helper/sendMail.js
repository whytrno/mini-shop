// sendinblue mailer
const Sib = require('sib-api-v3-sdk')

const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const host = process.env.HOST

const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email: 'whytrno@gmail.com',
    name: 'Admin mini shop',
}

const sendMessage = async (req) => {
    const receivers = [
        {
            email: req.user.email,
        },
    ]

    if (!req.data.textContent) req.data.textContent = 'Hallo'

    try {
        await tranEmailApi
            .sendTransacEmail({
                sender,
                to: receivers,
                subject: req.data.subject,
                textContent: req.data.textContent,
                htmlContent: req.data.htmlContent,
                // params: {
                //     name: req.user.name,
                // },
            })
    } catch (error) {
        throw error
    }
}

const verification = async (req) => {
    try {
        await sendMessage({
            user: {
                name: req.user.name,
                email: req.user.email
            },
            data: {
                subject: `Hallo ${req.user.name}, please verify your email to login at Mini Shop`,
                htmlContent: `
                        <h1>Please click link bellow to verify your email</h1>
                        <a href="${host}/auth/verify-email?token=${req.user.refreshToken}">Visit</a>
                    `
            }
        })
    } catch (error) {
        throw error
    }
}
// const notifRequestEmail = async (req) => {
//     try {
//         await sendMessage({
//             user: {
//                 name: req.user.name,
//                 email: req.user.email
//             },
//             data: {
//                 subject: `Hallo ${req.user.name}, you request to change email`,
//                 htmlContent: `<h1>You request to change email, if u don't do this, please contact us</h1>`
//             }
//         })
//     } catch (error) {
//         throw error
//     }
// }
// const changeEmail = async (req) => {
//     try {
//         await sendMessage({
//             user: {
//                 name: req.user.name,
//                 email: req.user.emailChange,
//             },
//             data: {
//                 subject: `Hallo ${req.user.name}, please verify your email to login at Mini Shop`,
//                 htmlContent: `
//                         <h1>Please click link bellow to verify your email</h1>
//                         <a href="${host}/users/verify?type=changeEmail&token=${req.user.refreshToken}">Visit</a>
//                     `
//             }
//         })
//     } catch (error) {
//         throw error
//     }
// }
// const forgotPassword = async (req) => {
//     try {
//         await sendMessage({
//             user: {
//                 name: req.user.name,
//                 email: req.user.email,
//             },
//             data: {
//                 subject: `Hallo ${req.user.name}, forgot password helper`,
//                 htmlContent: `
//                         <h1>Please click link bellow to forgot your password</h1>
//                         <a href="${host}/users/forgotPassword?token=${req.user.refreshToken}">Visit</a>
//                     `
//             }
//         })
//     } catch (error) {
//         throw error
//     }
// }

module.exports.sendMail = async (req, res) => {
    try {
        if (req.type === 'verification') {
            await verification(req)
            console.log(`Email ${req.type} has been sent`)
        } else {
            throw 'Something error with server'
        }
        // else if (req.type === 'notifRequestEmail') {
        //     await notifRequestEmail(req)
        //     console.log(`Email ${req.type} has been sent`)
        // } else if (req.type === 'changeEmail') {
        //     await changeEmail(req)
        //     console.log(`Email ${req.type} has been sent`)
        // } else if (req.type === 'forgotPassword') {
        //     await forgotPassword(req)
        //     console.log(`Email ${req.type} has been sent`)
        // }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error
        })
    }
}