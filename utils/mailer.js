const mailer = require('nodemailer')

const sendmail = async options=>{
    const transpoter = mailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        secure : false,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
    })

     const mailoptions = {
        from : 'AKRAM ELGYAR <akramelgyar@ggmail.com>',
        to : options.mail,
        subject : options.subject,
        text : options.message
     }

    await transpoter.sendMail(mailoptions)
}

module.exports = sendmail