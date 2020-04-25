/* eslint-env jest */
const jwtMiddleware = new (require('../../middleware/jwtmiddleware'))()
const next = jest.fn().mockResolvedValue('This does not matter')

describe('JwtMiddleWare', () => {
  beforeEach(() => {
    process.env.JWTSECRET = 'Somesecuresecret'
    jest.clearAllMocks()
  })

  const reqWithPath = {
    path: '/user'
  }

  const reqWithAuthorization = {
    path: '/test',
    headers: {
      authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJEb3Jzc3NzIiwiaWF0IjoxNTg3NzYzMjIxLCJleHAiOjE5MDMyOTYwMjEsImF1ZCI6Ind3dy5zdGVyZnZhbmRlZG9ycy5ubCIsInN1YiI6ImRvcnNAZG9ycy5ubCIsInVzZXJuYW1lIjoiZG9yc3RpZyJ9.HgaCMey_5dKod5Y3tS5oVsRAEHQQgxDN3MIt6B6IuDI'
    },
    user: 'Joejoe'
  }

  const reqWithAuthorizationAndPath = {
    path: '/user',
    headers: {
      authorization: 'Bearer ring bear'
    },
    user: 'Joejoe'
  }

  const res = {
    send: function () { },
    status: function (responseStatus) {
      expect(responseStatus).toBe(401)
      return this
    }
  }

  test('jwtMiddleWare skips auth on user path', () => {
    var userPathReturnsTrue = jwtMiddleware._checkIfPathNeedsAuthentication(reqWithPath)
    expect(userPathReturnsTrue).toBe(true)
  })

  test('jwtMiddleWare sanizeJwt returns undefined on no headers', () => {
    const shouldBeUndefined = jwtMiddleware._sanitizeJwt(reqWithPath)
    expect(shouldBeUndefined).toBe(undefined)
  })

  test('jwtMiddleWare sanizeJwt returns JWT with bearer', () => {
    const expectedValue = 'ring bear'
    const actualValue = jwtMiddleware._sanitizeJwt(reqWithAuthorizationAndPath)
    expect(actualValue).toBe(expectedValue)
  })

  test('jwtMiddleWare expect validateJwt to pass the username in the req', () => {
    jwtMiddleware.validateJwt(reqWithAuthorization, res, next)
    expect(reqWithAuthorization.user.username).toBe('dorstig')
  })

  test('jwtMiddleWare expect validateJwt to fail and log error on invalid JWT', () => {
    process.env.JWTSECRET = 'SomeInvalidSecret'
    const consoleSpy = jest.spyOn(console, 'error')
    jwtMiddleware.validateJwt(reqWithAuthorization, res, next)
    expect(consoleSpy).toHaveBeenCalled()
  })
})
