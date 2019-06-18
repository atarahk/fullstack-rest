import bcrypt from 'bcrypt'
import User from '../database/models/user'
const invalidField = validationMessageArr => ({
  status: 400,
  error: validationMessageArr
})

const validateEmailAndPassword = (email, password) => {
  const validationMessageArr = []
  const emailRegex = /\S[@]\S+[.]\S/
  if (!email) {
    validationMessageArr.push({ email: 'Email is Required' })
  }
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    validationMessageArr.push({ email: 'Invalid Email' })
  }
  if (typeof password !== 'string') {
    validationMessageArr.push({ password: 'Invalid Password' })
  }
  if (typeof password === 'string' && !password.trim()) {
    validationMessageArr.push({ password: 'Password is Required' })
  }
  return validationMessageArr
}

const trimFields = object => {
  const fields = Object.keys(object)
  const trimmedObject = {}
  fields.forEach(field => {
    trimmedObject[field] = object[field].trim()
  })
  return trimmedObject
}

const validators = {
  async validateUserLogin(req, res, next) {
    const { email, password } = req.body
    const validationMessageArr = validateEmailAndPassword(email, password)
    if (!validationMessageArr.length) {
      try {
        const userFound = await User.findOne({ email: email.toLowerCase() })
        if (!userFound) {
          return res.status(404).json({
            status: 404,
            message: 'User not found. Please Signup'
          })
        }
        const validPassword = await bcrypt.compare(
          password.trim(),
          userFound.password
        )
        if (!validPassword) {
          return res.status(401).json({
            status: 401,
            message: 'Invalid Credentials'
          })
        }

        req.body = trimFields(req.body)
        req.user = userFound
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: 'Server Error',
          error
        })
      }
    }
    return validationMessageArr.length
      ? res.status(400).json(invalidField(validationMessageArr))
      : next()
  },

  async validateUserSignUp(req, res, next) {
    const { username, email, password, confirmPassword } = req.body
    const validationMessageArr = validateEmailAndPassword(email, password)
    if (password !== confirmPassword) {
      validationMessageArr.push({
        password: 'Password and Confirm Password do not match'
      })
    }
    if (typeof username !== 'string') {
      validationMessageArr.push({ username: 'Invalid Username' })
    }
    if (typeof username === 'string' && !username.trim()) {
      validationMessageArr.push({ username: 'Username is Required' })
    }

    if (!validationMessageArr.length) {
      try {
        const userFound = await User.findOne({ email })
        if (userFound) {
          return res.status(409).json({
            status: 409,
            message: 'Email already Exists'
          })
        }
        req.body = trimFields(req.body)
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: 'Server Error',
          error
        })
      }
    }
    return validationMessageArr.length
      ? res.status(400).json(invalidField(validationMessageArr))
      : next()
  }
}

export default validators
