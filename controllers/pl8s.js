import { NotFound } from '../lib/error.js'
import { NotYours } from '../lib/error.js'
import Search from '../lib/hooks/Search.js'
import Pl8 from '../models/pl8.js'

async function index(req, res, next) {
  try {
    const pl8List = await Pl8.find()

    res.status(200).json(pl8List)
  } catch (e) {
    next(e)
  }
}

async function create(req, res, next) {
  req.body.user = req.currentUser

  try {
    const newPl8 = await Pl8.create(req.body)

    res.status(201).json(newPl8)
  } catch (e) {
    next(e)
  }
}

async function edit(req, res, next) {
  try {
    const currentUserId = req.currentUser._id
    const pl8 = await Pl8.findById(req.params.id)

    if (!pl8) {
      throw new NotFound('Pl8 not found.')
    }
    
    if (!currentUserId.equals(pl8.user)) {
      throw new NotYours('You don\'t own this pl8')
    }
    pl8.set(req.body)
    pl8.save()

    res.status(202).json(pl8)
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    
    const currentUserId = req.currentUser._id

    const pl8 = await Pl8.findById(req.params.id)

    if (!pl8) {
      throw new NotFound('Pl8 not found.')
    }
    
    if (!currentUserId.equals(pl8.user)) {
      throw new NotYours('You don\'t own this pl8')
    }

    await pl8.deleteOne()

    res.sendStatus(204)

  } catch (e) {
    next(e)
  }
}

async function search(req, res, next) {
  try {

    const list = await Search(req.query, 'Pl8')

    res.status(200).json(list)
  } catch (e) {
    next(e)
  }
}

async function show(req, res, next) {
  try {
    const pl8 = await Pl8.findById(req.params.id).populate('user')

    if (!pl8) {
      throw new NotFound('Pl8 not found.')
    }

    res.status(200).json(pl8)
  } catch (error) {
    next(error)
  }
}

export default {
  index,
  create,
  edit,
  remove,
  search,
  show,
}