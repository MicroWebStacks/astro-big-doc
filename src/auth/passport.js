import * as dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import {Strategy} from 'passport-github'
import express from 'express'
import session from 'express-session'
import { verifyUser,showKeys } from './auth_utils.js'

const GitHubStrategy = Strategy;

const strategyConfig = {
  clientID:     process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}

passport.use(new GitHubStrategy(strategyConfig,  verifyUser));
passport.serializeUser((user,done)=>{done(null,user)});
passport.deserializeUser((user,done)=>{done(null,user)});

const authRouter = express.Router()

//'sessionStore', 'sessionID', 'session'
authRouter.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:false
}))

//'logIn', 'login', 'logOut', 'logout', 'isAuthenticated', 'isUnauthenticated'
authRouter.use(passport.initialize())
authRouter.use(passport.session())

authRouter.use((req,resp,next)=>{
  //showKeys("2)",req)
  console.log('\n'+req.originalUrl)
  console.log(`req.sessionID : ${req.sessionID}`)
  console.log(`req.isAuthenticated() : ${req.isAuthenticated()}`)
  next()
})

authRouter.get('/auth/github',passport.authenticate('github'));

authRouter.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/access' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log("success in callback")
    res.redirect('/');
  });

//TODO Catch 404
//TODO Catch Errors

export{
    authRouter
}
