const jwt = require('jsonwebtoken')

class JwtMiddleWare {
  validateJwt (req, res, next) {
    const pathNeedsNoAuthentication = req.path.includes('signin')
    if (pathNeedsNoAuthentication) {
      next()
      return
    }
    const jwtFromRequest = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null
    if (jwtFromRequest === null) {
      res.status(401).send('Invalid JWT provided')
    }
    try {
      var user = jwt.verify(jwtFromRequest, process.env.JWTSECRET)
      console.log(`${user.username} Succesfully authenticated`)
      next()
    } catch (error) {
      console.error(`Error wile validating JWT: ${error.message}`)
      res.status(401).send('Invalid JWT provided')
    }
  }
}
module.exports = JwtMiddleWare
