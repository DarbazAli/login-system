'use strict';
console.clear();

const bcrypt = require('bcrypt');
const express = require('express');
const app = express();


// Fake Database
const users = [];


/*======================================================== 
    MIDLLEWARES
========================================================*/
app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs');


/*======================================================== 
    APP SCRIPT - START
========================================================*/

/* ========  GET ROUTES   ======= */
app.route('/').get((req, res) => {
    res.render('index.ejs', {name: 'Darbaz', title: 'Home'})
})

app.route('/login')
    .get((req, res) => {
        res.render('login.ejs', {title: 'Login'})
    })


app.route('/register')
    .get((req, res) => {
        res.render('register.ejs', {title: 'Register'})
    })

/* ========  POST ROUTES   ======= */
app.post('/register', async (req, res) => {
    const {name, email, password } = req.body;

    // if ( !name || !email || !password ) {
    //     res.status(400).send('please fill all fileds')
    // }

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        users.push({
            id: Date.now().toString(),
            name: name,
            email: email,
            password: hashedPass
        })

        // after user registerd, redirect to login page
        res.redirect('/login')
    }

    catch(err) {
        res.redirect('/register')
        console.error(err)
    }

    console.log(users);
})

/*======================================================== 
    APP SCRIPT - END
========================================================*/

app.listen(3000, console.log('Listening on 3000'));