"use strict";
console.clear();

if ( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}



const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initPassport = require('./passport-config');
const passport = require("passport");
const { restart } = require('nodemon');
initPassport(
    passport,
    email => users.find( user => user.email === email ),
    id => users.find(user => user.id === id)
)

// Fake Database
const users = [];

/*======================================================== 
    MIDLLEWARES
========================================================*/
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }));
app.set("view-engine", "ejs");

/*======================================================== 
    APP SCRIPT - START
========================================================*/

/* ========  GET ROUTES   ======= */
app.route("/").get(checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name, title: "Home" });
});

app.route("/login")
    .get(checkNotAuthenticated, (req, res) => {
        res.render("login.ejs", { title: "Login" });
});

app.route("/register").get(checkNotAuthenticated, (req, res) => {
  res.render("register.ejs", { title: "Register" });
});

/* ========  POST ROUTES   ======= */
app.post("/register",checkNotAuthenticated,  async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    users.push({
      id: Date.now().toString(),
      name: name,
      email: email,
      password: hashedPass,
    });

    // after user registerd, redirect to login page
    res.redirect("/login");
  } catch (err) {
    res.redirect("/register");
    console.error(err);
  }
  console.log(users);
});


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


app.delete('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

/*======================================================== 
    APP SCRIPT - END
========================================================*/

function checkAuthenticated( req, res, next) {
    if ( req.isAuthenticated() ) {
        return next();
    } else {
        res.redirect('/login')
    }
}


function checkNotAuthenticated( req, res, next) {
    if ( req.isAuthenticated() ) {
        res.redirect('/')
    } else {
        // res.redirect('/login')
        next()
    }
}

app.listen(3000, console.log("Listening on 3000"));
