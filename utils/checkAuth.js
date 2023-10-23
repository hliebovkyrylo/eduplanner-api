import jwt from "express-jwt";

export default (req, res, next) => {
  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH0_ISSUER_BASE_URL,
    }),
    audience: AUTH0_CLIENT_ID,
    issuer: process.env.AUTH0_ISSUER_BASE_URL,
    algorithms: ['RS256'],
  })

  return checkJwt(req, res, (err) => {
    if (err) {
      return res.status(401).send(err.message);
    }
    return next();
  });
};