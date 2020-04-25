const jwt = require('jsonwebtoken')

class JwtMiddleWare {
  validateJwt (req, res, next) {
    const pathNeedsNoAuthentication = this._checkIfPathNeedsAuthentication(req)
    if (pathNeedsNoAuthentication) {
      next()
      return
    }
    const jwtFromRequest = this._sanitizeJwt(req)
    if (jwtFromRequest === null || jwtFromRequest === undefined) {
      res.status(400).send('No JWT provided')
      return
    }
    try {
      var user = jwt.verify(jwtFromRequest, process.env.JWTSECRET)
      console.log(`${user.username} Succesfully authenticated`)
      req.user = user
      next()
    } catch (error) {
      console.error(`Error while validating JWT: ${error.message}`)
      res.status(401).send('Invalid JWT provided')
    }
  }

  _checkIfPathNeedsAuthentication (req) {
    return (req.path.includes('user'))
  }

  _sanitizeJwt (req) {
    if (req.headers) {
      if (req.headers.authorization) {
        return req.headers.authorization.replace('Bearer ', '')
      }
    }
  }
}
module.exports = JwtMiddleWare
