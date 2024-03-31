import express from 'express'
import session from 'express-session'
import UserRoutes from "./routes/user.route.js"
import exploreRoutes from "./routes/explore.route.js"
import authRoutes from "./routes/auth.route.js"
import "./passport/github.auth.js"

import passport from "passport";
import dotenv from "dotenv"
import cors from "cors"
import connectMongoDB from './db/connectMongoDB.js'
import path from 'path'

dotenv.config();//these will allow us to get the environment variable under process.env
const app=express();
const PORT=process.env.PORT || 5000
const __dirname=path.resolve();


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth",authRoutes)
app.use("/api/users",UserRoutes)
app.use("/api/explore",exploreRoutes)

app.use(express.static(path.join(__dirname, "/frontend/mern-github-app/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend","mern-github-app","dist", "index.html"));
});


app.listen(5000,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    connectMongoDB();

})