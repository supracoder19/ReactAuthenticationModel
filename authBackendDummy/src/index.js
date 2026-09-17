require("dotenv").config()
const express=require("express")
const cors=require("cors")
const cookP = require("cookie-parser")

const app=express()


app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(cookP())


const port= process.env.PORT||3000
app.listen(port,()=>{
    console.log("server is live on ",port)
})

app.get("/",(req,res)=>{
    res.send("App is live on "+port)
})

app.post("/login",(req,res)=>{
    const {username, password} = req.body
    if(username == "vilen" && password == "1234" )
    {
        res.status(200)
        res.cookie("refreshToken",1234,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        res.send({msg:"authorized",
            accessToken:"Bearer 9999"
        })
    }
    else{
        res.status(401)
        res.send({msg:"unauthorized"})
    }
})

app.post("/login",(req,res)=>{
    const {username, password} = req.body
    if(username == "user" && password == "1234" )
    {
        res.status(200)
        res.cookie("refreshToken",1234,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        res.send({msg:"authorized",
            accessToken:"Bearer 9999"
        })
    }
    else{
        res.status(401)
        res.send({msg:"unauthorized"})
    }
})

app.post("/refresh",(req,res)=>{
    const {refreshToken } = req.cookies
    if(refreshToken == 1234)
    {
        res.status(200)
        res.send({
            msg: "authorized",
            accessToken: "Bearer 9999",
            username:"user"
        })
    }
    else{
        res.status(401)
        res.send({
            msg:"unauthorized",
        })
    }
})

app.post("/logout",(req,res)=>{
    const {refreshToken } = req.cookies
    if(refreshToken == "1234")
    {
        res.status(200)
        res.clearCookie("refreshToken",{
            path:"/",
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        res.send({
            msg: "user logged out",
        })
    }
    else{
        res.status(401)
        res.send({
            msg:"unauthorized",
        })
    }
})


app.get("/protectedRoute",(req,res)=>{
    const {authorization} = req.headers
    if(authorization == "Bearer 9999")
    {
        res.status(200).json({
            msg:"hello user"
        })
    }
    else{
        res.status(401).json({
            msg:"unauthorized"
        })
    }
})