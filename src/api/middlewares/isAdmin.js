const isAdmin = (req, res, next) => {
    console.log(req.body);
    if (req.body.user.isAdmin !== true) {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    } else {
        next();
    }
}

export default isAdmin;