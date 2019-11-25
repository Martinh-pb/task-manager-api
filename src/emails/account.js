const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'martinhaisma@gmail.com',
        subject: 'Welcome to the task manager app',
        text: `Welcom to the app, ${name}. Let me know how you get along with the app.`
    })
}

const cancelAccountEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'martinhaisma@gmail.com',
        subject: 'Cancel account to the task manager app',
        text: `Hi ${name}, You're account is cancled all you're tasks are deleted.`
    })
}

module.exports = {
    sendWelcomeEmail,
    cancelAccountEmail
}