
const express       =  require("express");
const dotenv        =  require("dotenv");
//const morgan        =  require("body-parser");
const bodyparser    =  require("body-parser");
const app           =  express();
const path          =  require("path");
var sessionstorage = require('sessionstorage');
//dotenv.config({path:'config'})
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use( express.static( "assets" ) );
// SET VIEW ENGINE
app.set("view engine","ejs");
//app.set("views",path.resolve(__dirname,"views/ejs"))

// load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))

const Routes = require('./routes/routes');
app.use('/', Routes)


app.listen(3030,()=>{console.log("server in running on PORT:: '3030' ")})