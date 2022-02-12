require('./config/config');
const  express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res)=> {
    res.json('Hola Mundo');
});
app.get('/usuario', (req, res)=> {
    res.json({
        nombre: 'agus'
    })
});
app.post('/usuario', (req, res)=>{
    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    }else{
        res.json({body})
    }
})
app.listen(process.env.PORT, (err)=> {
    if(err) {
        console.log('No se puedo levantar el servidor')
    }else{
        console.log(`Servidor On in the port: ${process.env.PORT}`)
    }
})