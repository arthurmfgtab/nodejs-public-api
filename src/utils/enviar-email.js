const nodeMailer = require('nodemailer')
const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASSWORD

enviar_email = async (userId, userEmail, subject, body) => {
    try {
        const transporter = nodeMailer.createTransport({
            secure: false,
            service: 'Gmail',
            auth: { user, pass },
            tls: { rejectUnauthorized: false },
        })

        const mailOptions = { from: 'Samuel Buarque', to: userEmail, subject, text: body }

        await transporter.sendMail(mailOptions, (erro, res) => {
            if (erro) return erro
        })

        return 'Mail sent succesfully!'

    } catch (error) {
        return error
    }
}

module.exports = enviar_email