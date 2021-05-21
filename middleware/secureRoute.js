import jwt from 'jsonwebtoken'
import M8 from '../models/m8.js'
import { secret } from '../config/environment.js'

export default function secureRoute(req, res, next) {
  const rawToken = req.headers.authorization

  if (!rawToken || !rawToken.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Does not start with Bearer' })
  }

  const token = rawToken.replace('Bearer ', '')

  jwt.verify(token, secret, async(err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Token not valid' })
    }

    const m8 = await M8.findById(payload.m8Id)

    if (!m8) res.status(401).json({ message: 'No M8 matching the token' })

    req.currentM8 = m8

    next()
  })
}