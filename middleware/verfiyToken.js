const jwt = require('jsonwebtoken')

module.exports = {
    
    verifyToken :function (req, res, next) {

        const whitelist = ["/api/register" , "/api/login" , "/api/refresh-token"]
        if (whitelist.includes(req._parsedUrl.pathname)) {
            next()
            return;
        }
        const authToken = req.headers['authorization']
        const token = authToken && authToken.split(' ')[1]
        if (token == null) return res.sendStatus(401)
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) return res.sendStatus(401)
            // console.log(1,user)
            req.user = payload
            next()
        })
    
    
        }

}