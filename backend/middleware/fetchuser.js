var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Priyanshuisagoodb$oy';

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req objectr
    const token = req.header('auth-token')
    if(!token)
    {
        res.status(401).send({error : "PLease authenticate using a valid token"})
    }
    

    //ho sagta hai ki token valid na ho agar aisa hai tho us chij ko hum try catch me daal denge
    try {
        const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
    } catch (error) {
        res.status(401).send({error : "PLease authenticate using a valid token"})
    }
}

















module.exports = fetchuser;
