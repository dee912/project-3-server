import { secret } from '../config/environment.js'
import { NotValid } from '../lib/error.js'
import M8 from '../models/m8.js'
import jwt from 'jsonwebtoken'

async function register(req, res, next) {
  try {
    const newM8 = await M8.create(req.body)
    res.status(201).json(newM8)
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    const m8 = await M8.findOne({ email: req.body.email })
    if (!m8) {
      throw new NotValid('These login details were incorrect')
    }
    const isValidPw = m8.validatePassword(req.body.password)
    if (!isValidPw) {
      throw new NotValid('There was a problem logging in')
    }
    const token = jwt.sign(
      { m8Id: m8._id },
      secret,
      { expiresIn: '12h' }
    )
    res.status(202).json({ message: 'Login successful', token })
  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login,
}