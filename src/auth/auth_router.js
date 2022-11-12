import * as dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import {Strategy} from 'passport-github'
import express from 'express'
import session from 'express-session'
import { verifyUser } from './auth_verify.js'

const GitHubStrategy = Strategy;

const strategyConfig = {
  clientID:     process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}

let first_url = '/'

passport.use(new GitHubStrategy(strategyConfig,  verifyUser));
passport.serializeUser((user,done)=>{done(null,user)});
passport.deserializeUser((user,done)=>{done(null,user)});

const authRouter = express.Router()

//'sessionStore', 'sessionID', 'session'
authRouter.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))

//'logIn', 'login', 'logOut', 'logout', 'isAuthenticated', 'isUnauthenticated'
authRouter.use(passport.initialize())
authRouter.use(passport.session())

authRouter.get('/auth/github',passport.authenticate('github'));

authRouter.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/access' }),
  function(req, res) {
    console.log(`req.sessionID : ${req.sessionID} ; authenticated : ${req.isAuthenticated()}`)
    // Auth Success, redirect to first requested url
    res.redirect(first_url);
  });

authRouter.use((req,res,next)=>{
  if(req.isAuthenticated()){
    next()
  }else{
    console.log(`req.sessionID : ${req.sessionID} ; authenticated : ${req.isAuthenticated()}`)
    first_url = req.url
    res.redirect('/auth/github')
  }
})

export{
    authRouter
}
