import * as dotenv from 'dotenv'
dotenv.config()
import passport from 'passport'
import {Strategy} from 'passport-github'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { verifyUser,showKeys } from './auth_utils.js'

const GitHubStrategy = Strategy;

const strategyConfig = {
  clientID:     process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}

passport.use(new GitHubStrategy(strategyConfig,  verifyUser));

passport.serializeUser(function(user, cb) {
  console.log(`* passport.serializeUser githubId: ${user}`)
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  console.log(`* passport.deserializeUser : ${user}`)
  process.nextTick(function() {
    return cb(null, user);
  });
});


const authRouter = express.Router()

//authRouter.use((req,resp,next)=>{
//  showKeys("1)",req)
//  next()
//})

//'secret', 'cookies', 'signedCookies'
authRouter.use(cookieParser()) 

//'sessionStore', 'sessionID', 'session'
authRouter.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:false,
  cookie: {secure: true}
}))

//'logIn', 'login', 'logOut', 'logout', 'isAuthenticated', 'isUnauthenticated'
authRouter.use(passport.authenticate('session'));

authRouter.use((req,resp,next)=>{
  //showKeys("2)",req)
  console.log('\n'+req.originalUrl)
  console.log(req.sessionID)
  console.log(`req.isAuthenticated() : ${req.isAuthenticated()}`)
  //console.log(req.session)
  console.log(req.sessionStore.sessions)
  console.log("* cookies :")
  console.log(req.secret)
  console.log(req.cookies)
  console.log(req.signedCookies)
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
