const express = require('express');
//const request = require('request');
var sessionstorage = require('sessionstorage');

const router = express.Router();

const HomeControllers   = require('../controllers/homeController');
const signInControllers = require('../controllers/sign-inController');
const indexControllers  = require('../controllers/indexController');
const modalControllers  = require('../controllers/modalController');

router.get("/",HomeControllers.home)
// res.render("home");

// SIGN_IN
router.get('/sign-in',signInControllers.sign_in)
router.post('/home',signInControllers.postSign_in)

// SIGN_UP
router.get('/sign-up',HomeControllers.getSign_up)
router.post('/postSign-up',HomeControllers.postSign_up)

// INDEX
router.get('/index',indexControllers.getIndex)

// PDF 
router.post('/home/generatePdf',indexControllers.generatePdf)
router.get('/home/generatePdf/:name',indexControllers.viewPdf)

// OUR ADMIN USER
router.get('/adminUser',HomeControllers.getAllUsers)

// OUR USERS
router.get('/users',HomeControllers.getUsers)

// OUR OTP PAGE
router.get('/otpVerify',indexControllers.getOtpPage)

// OUR DELETE
router.delete('/delete/:id',indexControllers.delete)

// EDIT  PAGE
router.post('/edit',indexControllers.viewEditPage)

// SAVE EDIT DATA
router.post('/updateData',HomeControllers.saveEditData)

// PINCODE
router.post('/pincode/:pincode',HomeControllers.getAllPincodeData)

// LOGOUT
router.get("/logout",HomeControllers.logout)

module.exports = router;