import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import session from 'express-session'
import {Strategy} from 'passport-github'
import passport from 'passport'

const router = express.Router()
var GitHubStrategy = Strategy;

function findOrCreate(params, callback){
  console.log(params)
  let user = "user"
  callback(null,user)
}

passport.use(new GitHubStrategy({
    clientID:     process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(`function accessToken : ${accessToken}`)
    console.log(`function refreshToken : ${refreshToken}`)
    console.log(`function profile.id : ${profile.id}`)
    cb(null, "user");
  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:false,
  cookie: {secure: true}
}))

router.get('/auth/github',passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


export{
    router
}
