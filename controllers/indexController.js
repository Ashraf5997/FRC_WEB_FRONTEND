
const express = require('express');
//const request = require('request');
var sessionstorage = require('sessionstorage');
const axios = require('axios');
const { response } = require('express');
;
const router = express.Router();


const PDFDocument = require('pdfkit');
const fs = require('fs');
const path  = require('path');
//const { path } = require('pdfkit/js/mixins/vector');

// GET INDEX PAGE
exports.getIndex = (req, res )=>{

    console.log("INSIDE getIndex , LINE 5  , FROM : indexController")
    let userData=0, Emp_message ="0",Error_message = "0";
     userData = JSON.parse(sessionstorage.getItem('userData'));
    if(!userData){res.redirect("sign-in")}
    else{
      res.render("index",{
         userData:userData,
         Emp_message:Emp_message,
         Error_message:Error_message
          
      })
    }
   
    /**/
 }

 // GENERATE PDF
 exports.generatePdf = (req, res )=>{

   console.log("INSIDE savePdf , LINE 26  , FROM : indexController")
   let pdfData  = req.body.pdfdata;
   console.log("PDF_DATA :",pdfData)
   if(pdfData){

             /*  if(pdfData.length == 2)
               {
                     console.log("PDF DATA  OBJECT IS EMPTY : FROM indexController");
                     let userData = JSON.parse(sessionstorage.getItem('userData'));
                     res.render("index",{
                        userData:userData,
                        Emp_message:"Please customise your your 'RESUME' ,,change default data.",
                        Error_message:"0" 
               }) 
               //  console.log(pdfData);
               }else{*/
               //  console.log(pdfData.contactdetails.text);
                let userData = JSON.parse(sessionstorage.getItem('userData'));
                let pdfObject = JSON.parse(pdfData);

                let skillsArray = [pdfObject.c.text, pdfObject.java.text, pdfObject.javascript.text, pdfObject.nodejs.text,pdfObject.angular.text,pdfObject.reactjs.text,pdfObject.reactnative.text];
                let contactArray = [pdfObject.contact.text, pdfObject.email.text, pdfObject.district.text, pdfObject.pin.text,pdfObject.state.text];
                let interestArray = [pdfObject.interestP.text, pdfObject.interestC.text, pdfObject.interestS.text];

                var pdfDoc = new PDFDocument;
                 
                 let filename = userData.username+"_resume.pdf";  // req.params.name;
                 pdfDoc.pipe(fs.createWriteStream(filename));

               // CONTACT DETAILS
                  pdfDoc.font(pdfObject.contactdetails.fontWeight).fontSize(pdfObject.contactdetails.fontSize)
                  .fillColor(pdfObject.contactdetails.color)
                  .text(pdfObject.contactdetails.text,30,50);

               // CONTACT ARRAY
                   pdfDoc.list(contactArray).fontSize(pdfObject.contact.fontSize)
                   .fillColor(pdfObject.contact.color);
                   pdfDoc.moveDown(0.6);

               // FULLNAME 
                   pdfDoc.font(pdfObject.fullname.fontWeight).fontSize(pdfObject.fullname.fontSize)
                  .fillColor(pdfObject.fullname.color)
                  .text(pdfObject.fullname.text,360,50);  
                  
               // CARRIER OBJECTIVE 
                 pdfDoc.fontSize(pdfObject.carrierobjective.fontSize)
                 .fillColor(pdfObject.carrierobjective.color)
                 .text(pdfObject.carrierobjective.text,300,80,{align:'center'});  

               // EDUCATION DETAILS
                   pdfDoc.font(pdfObject.educationdetails.fontWeight).fontSize(pdfObject.educationdetails.fontSize)
                   .fillColor(pdfObject.educationdetails.color)
                   .text(pdfObject.educationdetails.text,300,190); 

                // CLASS10
                 pdfDoc.fontSize(pdfObject.classTN.fontSize)
                 .fillColor(pdfObject.classTN.color)
                 .text(pdfObject.classTN.text,300,220,{align:'center'});  
              
                // CLASS12
                 pdfDoc.fontSize(pdfObject.classTW.fontSize)
                 .fillColor(pdfObject.classTW.color)
                 .text(pdfObject.classTW.text,300,290,{align:'center'});  

               // COLLEGE
                  pdfDoc.fontSize(pdfObject.college.fontSize)
                  .fillColor(pdfObject.college.color)
                  .text(pdfObject.college.text,300,360,{align:'center'});  
 
               // INTEREST DETAILS
                 pdfDoc.font(pdfObject.interest.fontWeight).fontSize(pdfObject.interest.fontSize)
                .fillColor(pdfObject.interest.color)
                .text(pdfObject.interest.text,300,440); 

               // INTEREST  ARRAY
                   pdfDoc.list(interestArray).fontSize(pdfObject.contact.fontSize)
                   .fillColor(pdfObject.contact.color);
                   pdfDoc.moveDown(0.6);

                // SKILLS DETAILS
                   pdfDoc.font(pdfObject.skilldetails.fontWeight).fontSize(pdfObject.skilldetails.fontSize)
                   .fillColor(pdfObject.skilldetails.color)
                   .text(pdfObject.skilldetails.text,30,180);  

               // SKILLS  ARRAY
                   pdfDoc.list(skillsArray).fontSize(pdfObject.contact.fontSize)
                   .fillColor(pdfObject.contact.color);
                  // Move down a bit to provide space between lists
                   pdfDoc.moveDown(0.6);

                  pdfDoc.end()
                  res.redirect("/home/generatePdf/"+filename);  
               }
   }
   /*else{
      console.log("PDF OBJECT IS NOT CREATED : FROM indexController");
      let userData = JSON.parse(sessionstorage.getItem('userData'));
      res.render("index",{
          userData:userData,
          Error_message:"To generate pdf file , first you have  to click 'save' button ,, THANKS ",
          Emp_message:"0"
           
       })
   }*/
  // let pdfData = ;
  // console.log(sessionStorage.getItem("pdfData"));
//}

// VIEW PDF
exports.viewPdf = (req, res )=>{
 //  res.send("assdgsahd"+ req.params.name);
 let filename = req.params.name
   var option={ root: path.join("../FRC_WEB_FRONTEND")};
   res.sendFile(filename,option,function(err){
     if(err)
     {
      console.log(" PDF NOT GENERATED ")
     }else{
      console.log(" PDF GENERATED SUCCESSFULLY ")
     }
  });
   
}

// VIEW OTP PAGE
exports.getOtpPage = (req, res )=>{
   res.render("otpVerify");
}

// VIEW EDIT PAGE
exports.viewEditPage = (req, res )=>{
   let userId =req.body.uid 
  if( !userId){userId=109}
 
    console.log(userId);
    axios.get(`http://localhost:9600/getUserById/${userId}`)
      .then(response => {
       if(response.status == 200){
        console.log("user fetched successsfully");
       // return res.sendStatus('200')
       res.render("editUserData",{
          userData : response.data,
          ErrMessage:0
       });
       }
       else{
        console.log(" Error while edit data fetching  " );
       // return res.sendStatus('404')
       res.render("editUserData",{
         userData : 0,
         ErrMessage:"USER NOT EXIT WITH THIS ID."
      });
       }
      })
      .catch(error => {
        console.log("ERROR  viewing data : " ,error);
        res.render("editUserData",{
         userData : 0,
         ErrMessage:"USER NOT EXIT WITH THIS ID. TEXT ERROR !"
      });
       
      });
  
}

// VIEW OTP PAGE
exports.delete = (req, res )=>{
   //  res.send("assdgsahd"+ req.params.name);
 
    let userId = req.params.id;
    console.log(userId);
    axios.delete(`http://localhost:9600/deleteUserById/${userId}`)
      .then(response => {
       if(response.status == 200){
        console.log("user delete successsfully");
        return res.sendStatus('200')
       }
       else{
        console.log(" Error while deleting data " );
        return res.sendStatus('404')
       }
      })
      .catch(error => {
        console.log("ERROR  WHILE DELETING : " ,error);
       
      });

}


  