// require("./filesystem")
const express = require("express")
const app = express()





// global middleware

function mg(req, res, next) {
    console.log("this is middleware global")
    req.value = 60
    const error = new Error("this custom error")
    next(error)
}

function errorMiddleware(err,req,res,next){
    if(err){
        console.log(err,"is occured")
        return res.send(err)
    }
    else{
        next()
    }
}


app.use(mg)





// local middleware
function m1(err, req, res, next) {
    if(err){
        console.log("catch error",err)
        return res.send(err)
    }
        console.log("this is middleware 1")
        console.log("value is ", req.value)
        req.value = 600
        const error=new Error("custom error")
        next(error)
}

function m2(err, req, res, next) {
    if(err){
        conscole.log(err)
    }
    console.log("this is second middleware -2")
    console.log("update value", req.value)
    next()
}


app.get("/", [m1, m2], (req, res) => {
    res.status(200).send("<h1>hello</h1>")
})

app.use(errorMiddleware)
app.listen(5000, (err) => {
    if (err) {
        console.log("server is not satrt at port", 5000)
    }
    console.log("server is start at port number", 5000)
})