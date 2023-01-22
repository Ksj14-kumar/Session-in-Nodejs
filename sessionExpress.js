const express=require("express")
const app= express()
const session= require("express-session")
const { default: mongoose } = require("mongoose")
const Mongostore= require("connect-mongo")





const URL= "mongodb://localhost:27017/session_db"
mongoose.connect(URL,(err)=>{
   if(err){
    console.log("not connect to db",err)
   }
   else{
    console.log("connect to db")
   }
})


app.use(session({
    name:"new session",
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    store:Mongostore.create({mongoUrl: URL}),
    cookie:{
        domain:"/",
        path:"/",
        sameSite:false,
        maxAge:1000*60*60*24

    }
}))

app.get("/",(req,res)=>{

    // track user how many number of times visited using session
    if(req.session.value){
        res.session.value++
    }
    else{
        req.session.value=1
    }
    return res.status(200).jsonp({"visited":req.session.value})
})



app.listen(4000,(err)=>{
    if(err){
        console.log("server is not start",err)
    }
    console.log("server is start at port",4000)
})
