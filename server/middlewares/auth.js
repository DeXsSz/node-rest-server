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
const verificarToken_Admin = (req, res, next)=> {
    let usuario = req.usuario;

    if(usuario.role === "ADMIN_ROLE") {
        next();
    }else{
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no tiene rol de admin'
            }
        })
    }
} 

module.exports ={ 
    verificarToken,
    verificarToken_Admin
};