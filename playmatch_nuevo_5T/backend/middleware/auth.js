import jwt from "jsonwebtoken";

const SECRET_KEY = "clave_secreta";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(403).json({ message: "Token requerido"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, SECRET_KEY);

        req.usuario = decoded;

        next();
    } catch (error){
        return res.status(401).json({ message: "Token inválido" });
    }
};