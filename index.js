const functions = require('firebase-functions');
const nodemailer=require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//creates function for trigger

exports.sendAccountCreationEmail=functions.firestore.document('counsellors/{councillor_id}')
.onWrite(event=>{
    let request=event.data.data();
if(request){
        let userEmail=request.email;
        let userName=request.name;
        let userDefaultPass=request.password;
        let userMessage=`Dear ${userName},Your Keep Safe Councillor account has been created,your default password 
        is ${userDefaultPass} you can change your password at anytime.Thanks,Regards.
        `;
    

        let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'crycetruly@gmail.com',
                pass: 'JXvq6thCuM!'
              }
            });



            // setup email data with unicode symbols
            let mailOptions = {
                from: `Cryce Truly  at Keep Safe`, // sender address
                to: `${userEmail},aacryce@gmail.com`, // list of receivers
                subject: 'Keep Safe Account Creation', // Subject line
                text: `${userMessage}`, // plain text body
                html: `Dear <strong> ${userName}</strong>, Your Keep Safe Councillor account has been created,your default password 
                is <strong>${userDefaultPass}</strong>.
                
                click here to start using your account <a href="www.google.com">Keep Safe Councillor</a>
                
                you can change your password at anytime.Thanks,Regards.
                ` // html body
            };
            
            console.log(mailOptions);
 // send mail with defined transport object
 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }else{
        console.log('Email sent');
    }
    console.log('Message sent: %s', info.messageId); 

});
        }
});
