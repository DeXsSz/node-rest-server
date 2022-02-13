
//Puerto
process.env.PORT = process.env.PORT || 3000;
//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//DATABASE

let urlDB;

urlDB = 'mongodb+srv://gatoloco:gatitoloco@cluster0.ytwv5.mongodb.net/cafe'
// if(process.env.NODE_ENV === 'dev'){
//     urlDB = 'mongodb://localhost:27017/cafe';
// }else{
// }
/// pass and username of database of mongodb Atlas
//user: gatoloco pass: gatitoloco
//mongodb+srv://gatoloco:gatitoloco@cluster0.ytwv5.mongodb.net/test


process.env.URLDB = urlDB