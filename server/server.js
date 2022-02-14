require('./config/config');

const  express = require('express');
const  mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
const colors = require('colors');



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//  Config global of routes
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, (err)=> {
    
    if(err) throw err;
    
    console.log('DATABASE Online'.green)
});


app.listen(process.env.PORT, (err)=> {
    console.log(`Escuchando el puerto: ${process.env.PORT}`)
})