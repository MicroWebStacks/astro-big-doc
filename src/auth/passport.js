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

authRouter.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:false,
  cookie: {secure: true}
}))

authRouter.use((req,resp,next)=>{
  console.log(req.originalUrl)
  console.log(req.sessionID)
  console.log(req.session)
  console.log(req.sessionStore)
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
