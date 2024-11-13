var jwt = require('jsonwebtoken');
const JWT_SECRET = 'YashisaLemonBoy';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
       return res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try{
        const datastring = jwt.verify(token, JWT_SECRET);
        req.user = datastring.user;
        console.log(req.user.id);
        next();
    }
    catch(error) {
        return res.status(401).send({error: "Please authenticate using a valid token"});
    }
    
}

module.exports = fetchuser;