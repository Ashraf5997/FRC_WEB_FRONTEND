//const request = require('request');
//const bcrypt = require('bcryptjs');
const axios = require('axios');
const { response } = require('express');
var sessionstorage = require('sessionstorage');

const { message } = require("statuses")

//  HOME PAGE RENDERING
exports.home = (req, res )=>{
  let Error_message =0,ourusers= 0;
   console.log("INSIDE home , LINE LINE 11 , FROM : homeController")
   res.render("home",{
    Error_message,
    ourusers
})
}

// LOGOUT
exports.logout = (req, res )=>{
    console.log("INSIDE logout , LINE LINE 19 , FROM : homeController")
    sessionstorage.clear();
    res.render("sign-in",{
        message:"you have successfully loggedout",
        Error_message:"0"
    })
}

//  SIGN_UP PAGE RENDERING
exports.getSign_up = (req , res )=>{
  //  if(sessionstorage.getItem("userData")){res.redirect("index")}
  let userData = JSON.parse(sessionstorage.getItem('userData'));
  console.log("INSIDE SIGN_UP , LINE LINE 33, FROM : sign-inController")
  if(sessionstorage.getItem("userData")){res.render("index", {
      userData:userData,
      Emp_message:"0",
      Error_message:"0"
      
  })}
  
    let = username = "" , useremail = "" , userpassword = "" , confirmpassword="" , Err_message="0" ,pincodeData='0';
    pincodeData = JSON.parse(sessionstorage.getItem('pincodeData'));

    res.render("sign-up", {
        pincodeData:pincodeData,
        username     :  username,
        useremail    :  useremail,
        userpassword :  userpassword,
        confirmpassword: confirmpassword,
        Err_message : Err_message
    })
    console.log("INSIDE SIGN_UP , LINE LINE 26  , FROM : homeController");
}

 exports.postSign_up = (req , res)=>{
 
    let reqbody={

         username:         req.body.username,
         useremail:        req.body.useremail,
         userpassword:     req.body.userpassword,
         pincode:          req.body.pincode ,
         block:            req.body.block,
         district:         req.body.district,
         state:            req.body.state,
         country:          req.body.country,
    }

    axios.post('http://localhost:9600/userRegistration',reqbody)
    .then(response => {
       // console.log(response.status);
        //if(response.status == 201){
        //    console.log("response: ",response.status )
         return  res.sendStatus(response.status);
            /* res.render("sign-in",{
                message : "YOUR REGISTRATION HAS DONE SUCCESSFULLY, PLEASE GET SIGN-IN ",
                Error_message:"0"
            })*/

        /*}else if(response.status == 409)
        {
             console.log(response.status)
        }*/
    })
    .catch(error => {
        console.log("ERROR" , error.status);
        return  res.sendStatus('409');

        /*
      res.render("sign-up",{
          username     :  username,
          useremail    :  useremail,
          userpassword :  userpassword,
          confirmpassword : confirmpassword,
          Err_message : "Email already exist" 
      })*/

   });


  /*  req.checkBody('username','full name must have value .').notEmpty();
    req.checkBody('useremail','email  must have value .').notEmpty();
    req.checkBody('userpassword','password must have value .').notEmpty();
    req.checkBody('confirmpassword','confirm password must have value .').notEmpty();*/
    
   /* let username         =      req.body.username;
    let useremail        =      req.body.useremail;
    let userpassword     =      req.body.userpassword;
    let confirmpassword  =      req.body.confirmpassword;
    let Err_message      =      "0";
   // let  errors =  req.validationErrors();
    if((username && useremail) && (userpassword && confirmpassword))
    { if(userpassword == confirmpassword)
        {
           let reqbody={
               username:username,
               useremail:useremail,
               userpassword:userpassword
           }
           let message,Error_message;
            axios.post('http://localhost:9600/userRegistration',reqbody)
              .then(response => {
               if(response.status == 201){
                   res.render("sign-in",{
                       message : "YOUR REGISTRATION HAS DONE SUCCESSFULLY, PLEASE GET SIGN-IN ",
                       Error_message:"0"
                   })
               }
              })
              .catch(error => {
                res.render("sign-up",{
                    username     :  username,
                    useremail    :  useremail,
                    userpassword :  userpassword,
                    confirmpassword : confirmpassword,
                    Err_message : "Email already exist" 
                })
              });

        }else{
            res.render("sign-up",{
                username     :  username,
                useremail    :  useremail,
                userpassword :  userpassword,
                confirmpassword : confirmpassword,
                Err_message : "Password do not match" 
            })
        }
    }else{
         res.render("sign-up",{
            username     :  username,
            useremail    :  useremail,
            userpassword :  userpassword,
            confirmpassword : confirmpassword,
            Err_message : "All fields are mandatory" 
         })
    }*/
    console.log("INSIDE POSTSIGN_UP , LINE LINE 87  , FROM : homeController");
 }

 exports.getAllUsers = (req, res )=>{
    console.log("INSIDE getAllUsers , LINE LINE 109 , FROM : homeController")
    let message,Error_message;
   let userData = JSON.parse(sessionstorage.getItem('userData'));
   //let userData=0, Emp_message ="0",Error_message = "0";
  // userData = JSON.parse(sessionstorage.getItem('userData'));
  if(!userData){res.redirect("sign-in")}
    axios.get('http://localhost:9600/ourusers')
      .then(response => {
       if(response.status == 200){
       // console.log("LIST OF USERS : " ,response.data);
       // sessionstorage.setItem('totalUsers',response.data)
           res.render("viewuserpage",{
               ourusers :  response.data,
               Error_message:"0",
               userData:userData,
           })
       }
       else{
        console.log("LIST OF USERS FETCHING ERROR : RECORDS NOT FOUND " );
        res.render("home",{
            Error_message : " Records not found  !" 
        })
       }
      })
      .catch(error => {
        console.log("LIST OF USERS FETCHING ERROR : " ,error);
        res.render("home",{
            Error_message : " Something went wrong please try latter !" 
        })
      });
}

// GET ALL PINCODE DATA
exports.getAllPincodeData = (req, res )=>{
      console.log("INSIDE getAllPincodeData , LINE LINE 181 , FROM : homeController")

      // let message,Error_message;
      //let pincode = 855107;

      let pincode = req.params.pincode
      console.log(pincode)

      axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(response => {
        if(response.data[0].Status == 'Success'){
              console.log("LIST OF PINCODE  DATA : " ,response.data[0].PostOffice[0]);
           //   sessionstorage.setItem('pincodeData',JSON.stringify(response.data[0].PostOffice) )
            //  let userData = JSON.parse(sessionstorage.getItem('userData'));
             return res.send(response.data[0].PostOffice[0]);
           // render('sign-up');
           // return res.send("nsvdghdc");
          }
          else{
             return  res.sendStatus('404');
          }
        })
      .catch(error => {
        console.log("LIST OF PINCODE FETCHING ERROR : " ,error);
        return  res.sendStatus('409');
     
      });
}

// GET USERS BY PAGINATION
exports.getUsers = (req, res )=>{
 //res.render('viewuserpage');
   console.log("INSIDE getUser , LINE LINE 220 , FROM : homeController");

    // let pageNo = req.params.pageNo;
    // console.log(pageNo)
    // if(pageNo ==""){ pageNo = 0}
    // console.log("ahjghsfagsfh]"+pageNo)
    // let userData = JSON.parse(sessionstorage.getItem('userData'));

  //console.log("userData"+userData);
    axios.get('http://localhost:9600/ourusers/')
      .then(response => {
       if(response.status == 200){
      //  console.log("LIST OF USERSpage : " ,response.data);
        
           res.render("ourusers",{
               ourusers :  response.data,
               Error_message:"0",
              // userData:userData
          
           })
       }
       else{
        console.log("LIST OF USERSpage FETCHING ERROR : RECORDS NOT FOUND " );
        res.render("home",{
            Error_message : " Records not found  !" 
        })
       }
      })

      .catch(error => {
        console.log("LIST OF USERS FETCHING ERROR : " ,error);
        res.render("home",{
            Error_message : " Something went wrong please try latter !" 
        })
      });
}

//  saveEDITDATA
exports.saveEditData = (req , res )=>{
    //  if(sessionstorage.getItem("userData")){res.redirect("index")}
    
   //let userId = req.params.id;
 //  console.log(userId);
   let objData ={
     id : req.body.id,
      username :  req.body.username,
      useremail :  req.body.useremail,
      userpassword :  req.body.userpassword,
      pincode :  req.body.pincode,
      block :  req.body.block,
      district:  req.body.district,
      state :  req.body.state,
      country :  req.body.country
   }
   console.log(objData);
   axios.put('http://localhost:9600/updateUser',objData)
     .then(response => {
      if(response.status == 200){
       console.log("edit user saved successsfully THANKS");
      // res.redirect("/adminUser")
       return res.sendStatus(200);
        // return res.sendStatus('200')
       /* res.redirect("/adminUser"),{
            userData : response.data,
            ErrMessage:0
        });*/
      }
      else{
       console.log(" Error while edit data fetching  " );
       return res.sendStatus(404)
       // return res.sendStatus('404')
        /*  res.render("editUserData",{
            userData : 0,
            ErrMessage:"USER NOT EXIT WITH THIS ID."
        });*/
      }
     })
     .catch(error => {
        return res.sendStatus(response.status);
      /* console.log("ERROR  WHILE DELETING : " ,error);
       res.render("editUserData",{
        userData : 0,
        ErrMessage:"USER NOT EXIT WITH THIS ID."*/
     });
      
   
 

}

// DEMO LEARNING PURPOSE CODE
  
        /* if(response.data[0].Status == 'Success'){
          console.log("LIST OF PINCODE  DATA : " ,response.data[0].PostOffice);
          res.render("sign-up",{
            pincodeData:  response.data[0].PostOffice,
           
        })
        //  return  res.sendStatus('200');

         }else{
          console.log("LIST OF PINCODE  DATA ERROR : " ,response.data[0].Status);
          return  res.sendStatus('409');
           
         }
          /* */



          /*   res.render("home",{
            Error_message : " Something went wrong please try latter !" 
        })*/