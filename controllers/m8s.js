import M8 from '../models/m8.js'
// import jwt from 'jsonwebtoken'

async function register(req, res, next) {
  try {
    const newM8 = await M8.create(req.body)
    res.status(201).json(newM8)
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {

}

export default {
  register,
  login,
}