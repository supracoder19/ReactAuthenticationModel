require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookP = require("cookie-parser")

const app = express()


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookP())


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("server is live on ", port)
})

app.get("/", (req, res) => {
    res.send("App is live on " + port)
})

app.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username == "user" && password == "1234") {
        res.status(200)
        res.cookie("refreshToken", 1234, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        res.send({
            msg: "authorized",
            accessToken: Date.now()
        })
    }
    else {
        res.status(401)
        res.send({ msg: "unauthorized" })
    }
})

app.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username == "user" && password == "1234") {
        res.status(200)
        res.cookie("refreshToken", 1234, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        res.send({
            msg: "authorized",
        })
    }
    else {
        res.status(401)
        res.send({ msg: "unauthorized" })
    }
})

app.post("/refresh", (req, res) => {
    const { refreshToken } = req.cookies
    if (refreshToken == 1234) {
        res.status(200)
        res.send({
            msg: "authorized",
            accessToken: Date.now(),
            username: "user"
        })
    }
    else {
        res.status(401)
        res.send({
            msg: "unauthorized",
        })
    }
})

app.post("/logout", (req, res) => {
    const { refreshToken } = req.cookies
    if (refreshToken == "1234") {
        res.status(200)
        res.clearCookie("refreshToken", {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })
        res.send({
            msg: "user logged out",
        })
    }
    else {
        res.status(401)
        res.send({
            msg: "unauthorized",
        })
    }
})


app.get("/protectedRoute", (req, res) => {
    const { authorization } = req.headers
    try {
        const expTime = Number(authorization.replace("Bearer ", ""))
        if (Date.now() - 600000 <= expTime && expTime <= Date.now()) {
            res.status(200).json({
                msg: "hello user"
            })
        }
        else throw new Error()
    } catch (error) {
        res.status(401).json({
            msg: "unauthorized"
        })
    }

})