//sendGrid api
const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'iamajithraja@gmail.com',
        subject:'Welcome to Task Manager',
        text:`It is nice to have you ${name}`
        
    })
}

const sendCancellationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'iamajithraja@gmail.com',
        subject:'Sorry to see you go',
        text:`your feedback is valuable ${name}`
        
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}