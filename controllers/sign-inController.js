const axios = require('axios')
var sessionstorage = require('sessionstorage');
const Swal = require('sweetalert2')
//  SIGN_IN PAGE RENDERING

const nodemailer = require('nodemailer');

exports.sign_in = (req , res )=>{
    let userData = JSON.parse(sessionstorage.getItem('userData'));
    console.log("INSIDE SIGN_IN , LINE LINE 9, FROM : sign-inController")
    if(sessionstorage.getItem("userData")){res.render("index", {
        userData:userData,
        Emp_message:"0",
        Error_message:"0"
        
    })
    
    }
    let message ="0",Error_message = "0";
    res.render("sign-in",{
      message:message,
      Error_message:Error_message
    })
}

exports.postSign_in = (req , res )=>{

    let userpassword        =           req.body.inputpassword;
    let useremail           =           req.body.inputEmail;
    
    let reqbody={
      
        useremail:useremail,
        userpassword:userpassword
    }

     
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ashrafjamal5997@gmail.com',
        pass: 'jamal@5997'
    }
});
  
let mailDetails = {
    from: 'ashrafjamal5997@gmail.com',
    to: 'rezaladla@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});


        axios.post('http://localhost:9600/userLogin',reqbody)
        .then(response => {

             sessionstorage.setItem('userData',JSON.stringify(response.data) )
             let userData = JSON.parse(sessionstorage.getItem('userData'));

             console.log("DATA OF USER ", userData);
             return res.sendStatus(response.status);
        })
        .catch(error => {
               console.log(error)  ;
             return res.sendStatus('401');

        });
}

/* ALERT USER OF THIS EMAIL ALL SAME ALL THI */

   // let Error_message;
   // let message;

/*
    console.log(userpassword , useremail)
    if(useremail !="" && userpassword !="" ){
        let reqbody={
            useremail:useremail,
            userpassword:userpassword
     }
       
       axios.post('http://localhost:9600/userLogin',reqbody)
        .then(response => {
            sessionstorage.setItem('userData',JSON.stringify(response.data) )
            let userData = JSON.parse(sessionstorage.getItem('userData'));
             console.log("DATA OF USER ", userData)
             // return res.status(200).json({"message":"donrojekd"});
             if(response.status == 401){
             return res.sendStatus(response.status)}
             else { return res.sendStatus(200)}
           // localStorage.setItem('userData',JSON.stringify(response.data))
          /* res.render('index',{
                userData:userData,
                Emp_message:"0",
                Error_message:"0"
                
            })
          
        })
        .catch(error => {
               console.log(error)
               
        });
       
    }else{
      
       res.render("sign-in",{
            Error_message:"Please provide your credentials",
            message:'0'
        })
    }
    console.log("INSIDE POSTSIGN_IN , LINE LINE 46 , FROM : sign-inController")
   // return("userData");*/

