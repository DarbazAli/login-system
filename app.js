'use strict';
console.clear();

const express = require('express');
const app = express();


/*======================================================== 
    APP SCRIPT - START
========================================================*/

// SETUP HOME ROUTE
app.route('/').get((req, res) => {
        res.send('Hello world')
})





/*======================================================== 
    APP SCRIPT - END
========================================================*/

app.listen(3000, console.log('Listening on 3000'));