require('dotenv').config()
const nodemailer = require('nodemailer');

class MailProvider {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    }

    async sendMail(options) {
        this.transporter.sendMail(options);        
    }
}

module.exports = MailProvider
