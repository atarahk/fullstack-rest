import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.SECRET_KEY

const tokenizer = {
  createToken: user =>
    new Promise((resolve, reject) => {
      jwt.sign({ user }, secretKey, (err, token) => {
        if (err) {
          reject(err)
        }
        resolve(token)
      })
    }),
  verifyToken: (req, res, next) => {
    const token =
      req.body.token ||
      req.headers['x-access-token'] ||
      req.headers.authorization ||
      req.params.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token found. Please Login'
      })
    }
    return jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Invalid Token, Please Login'
        })
      }
      req.user = decoded
      return next()
    })
  }
}

export default tokenizer
