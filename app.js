'use strict';
console.clear();

const express = require('express');
const app = express();


/*======================================================== 
    MIDLLEWARES
========================================================*/
app.set('view-engine', 'ejs');


/*======================================================== 
    APP SCRIPT - START
========================================================*/

// SETUP HOME ROUTE
app.route('/').get((req, res) => {
    res.render('index.ejs', {name: 'Darbaz'})
})





/*======================================================== 
    APP SCRIPT - END
========================================================*/

app.listen(3000, console.log('Listening on 3000'));