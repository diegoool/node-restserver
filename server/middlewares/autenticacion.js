const jwt = require('jsonwebtoken');

// ==================
// VERIFICAR TOKEN
// ==================

let verificaToken = (req, res, next) => {


    let token = req.get('token'); // Authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no valido"
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

    // res.json({
    //     token: token
    // });

};

// ==================
// VERIFICA ADMIN ROLE
// ==================


let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: "El usuario no es administrador"
            }
        });
    }
}


module.exports = {
    verificaToken,
    verificaAdmin_Role
}