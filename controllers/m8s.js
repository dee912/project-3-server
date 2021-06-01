import { secret } from '../config/environment.js'
import { NotValid, NotFound, NotYours, EmailNotUnique, NoPassword } from '../lib/error.js'
import M8 from '../models/m8.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function register(req, res, next) {
  try {
    console.log('I am APPEARING IN THE CORRECT AREA')
    const m8 = await M8.findOne({ email: req.body.email })
    console.log(m8)
    if (m8) {
      if (m8.deleted) {
        req.body.deleted = false
        if (req.body.password === '') throw new NoPassword('A Password is Required')
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
        console.log(req.body.password)
        const reactivatedM8 = await m8.updateOne(req.body, { new: true })
        res.status(201).json(reactivatedM8)
      } else {
        throw new EmailNotUnique('This email is taken')
      }
    } else {
      req.body.deleted = false
      req.body.highScore = 0
      const newM8 = await M8.create(req.body)
      res.status(201).json(newM8)
    }
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
    if (m8.deleted === true) {
      throw new NotValid('This acount has been "Deleted"')
    }
    const token = jwt.sign(
      { m8Id: m8._id },
      secret,
      { expiresIn: '12h' }
    )
    res.status(202).json({ message: 'Login successful', token, id: m8._id })
  } catch (error) {
    next(error)
  }
}

async function show(req, res, next) {
  try {
    const m8 = await M8.findById(req.params.id)
      .populate('r8dPl8s')

    if (!m8) {
      throw new NotFound('M8 not found.')
    }

    res.status(200).json(m8)
  } catch (error) {
    next(error)
  }
}

async function edit(req, res, next) {
  try {
    const currentM8Id = req.currentM8._id
    const m8 = await M8.findById(currentM8Id)

    if (!currentM8Id.equals(m8._id)) {
      return res.status(401).json({ message: 'Not the correct user' })
    }

    const updatedM8 = await m8.updateOne(req.body, { new: true })
    res.status(200).json(updatedM8)
  } catch (error) {
    next(error)
  }
}
async function index(req, res, next) {
  try {
    const pl8List = await M8.find()

    res.status(200).json(pl8List)
  } catch (e) {
    next(e)
  }
}

async function remove(req, res, next) {
  try {

    const currentUserId = req.currentM8._id

    const m8 = await M8.findById(req.params.id)

    if (!m8) {
      throw new NotFound('M8 not found.')
    }

    if (!currentUserId.equals(m8._id)) {
      throw new NotYours('ThIs IsNT YoUr PrOfIlE!!!')
    }

    m8.deleted = true
    await m8.save()

    res.sendStatus(204)

  } catch (e) {
    next(e)
  }
}

async function add(req, res, next) {
  try {
    const m8 = await M8.findById(req.currentM8._id)

    if (!m8) {
      throw new NotFound('M8 not found.')
    }

    m8.m8s.push(req.body.m8)

    await m8.save()

    res.status(201).json(m8)
  } catch (e) {
    next(e)
  }
}

async function deleteAM8(req, res, next) {
  try {
    const { id } = req.params

    const m8 = await M8.findById(req.currentM8._id)
    if (!m8) {
      throw new NotFound('M8 not found.')
    }

    const index = m8.m8s.findIndex(ids => {
      return String(ids) === id
    })
    m8.m8s.splice(index, 1)
    await m8.save()
    res.status(200).json(m8)

  } catch (e) {
    next(e)
  }
}

export default {
  register,
  login,
  show,
  edit,
  index,
  remove,
  add,
  deleteAM8,
}