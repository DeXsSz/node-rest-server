
//Puerto
process.env.PORT = process.env.PORT || 3000;
//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//DATABASE
let urlDB;

if(process.env.NODE_ENV === 'dev'){
        urlDB = 'mongodb://localhost:27017/cafe';
    }else{
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

//Vencimiento de token
//60 segundos, 60 minutos, 24 horas, 30 dias = equivalente a 30 dias 
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//SEED de auth
process.env.SEED_AUTH = process.env.SEED_AUTH || 'este-es-el-seed-de-desarrollo';

//client-id of google

process.env.CLIENT_ID = process.env.CLIENT_ID  || "513184343851-qrc7e84usjp3qd7irvkhukl59g3q27q6.apps.googleusercontent.com";