import passport from 'passport'
import {Strategy} from 'passport-github'
import express from 'express'
import session from 'express-session'
//import cookieParser from 'cookie-parser'
import { verifyUser } from './auth_verify.js'
import { env } from 'node:process';

import * as dotenv from 'dotenv'
dotenv.config()

const GitHubStrategy = Strategy;

const callbackURL = process.env.SERVER_HOST+":"+process.env.SERVER_PORT+"/auth/github/callback"
const strategyConfig = {
  clientID:     process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: callbackURL
}
let first_url = '/'

const sessionStore = new session.MemoryStore()

passport.use(new GitHubStrategy(strategyConfig,  verifyUser));
passport.serializeUser((user,done)=>{done(null,user)});
passport.deserializeUser((user,done)=>{done(null,user)});

const authRouter = express.Router()

//authRouter.use(cookieParser())
//authRouter.use((req,res,next)=>{
//  console.log("cookies:")
//  console.log(req.cookies)
//  next()
//})

//'sessionStore', 'sessionID', 'session' (session.cookie, session.passport.user)
//sessionStore => [ '_events', '_eventsCount', '_maxListeners', 'sessions', 'generate' ]
authRouter.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  // using MemoryStore for limited users pool only (accepting reset on server restart)
  store: sessionStore
}))

//'logIn', 'login', 'logOut', 'logout', 'isAuthenticated', 'isUnauthenticated'
authRouter.use(passport.initialize())
authRouter.use(passport.session())

authRouter.use((req,res,next)=>{
  const user = req.session?.passport?.user
  if(user){
      env[req.sessionID] = user.id
      //TODO on session expires delte the sessionID to prevent a memory leak
    }
    next()
  }
)

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

function get_session_id(cookie){
  const prefix = "connect.sid=s%3A"
  if(cookie.startsWith(prefix)){
    return (cookie.split(prefix)[1].split(".")[0])
  }
  return 0
}

export{
    authRouter,
    get_session_id
}
