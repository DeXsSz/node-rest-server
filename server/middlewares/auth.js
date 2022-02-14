const jwt = require('jsonwebtoken');
//VerificarToken

const  verificarToken = (req, res, next)=>{
    let token = req.get('token');
    
    jwt.verify(token, process.env.SEED_AUTH, (err, decoded)=>{

        if(err){
            return res.status(401).json({ok: false, err})
        }
        req.usuario = decoded.usuario;
        next();
    })
    // res.json({token});
};

module.exports = verificarToken;