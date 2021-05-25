import Pl8 from '../models/pl8.js'
import { NotFound, NotYours } from '../lib/error.js'

async function create(req, res, next) {
  req.body.m8 = req.currentM8._id
  try {
    const pl8 = await Pl8.findById(req.params.id) 
      .populate('user')
      .populate('comments.user')

    if (!pl8) {
      throw new NotFound('Pl8 not found.')
    }

    pl8.comments.push(req.body)

    const savedPl8 = await pl8.save()

    res.send(savedPl8)
  } catch (e) {
    next(e)
  }
}

async function edit(req, res, next) {
  try {
    const { pl8Id, commentId } = req.params

    const pl8 = await Pl8.findById(pl8Id)

    if (!pl8) {
      throw new NotFound('Pl8 not found')
    }

    const comment = pl8.comments.id(commentId)

    if (!req.currentM8._id.equals(comment.m8)) {
      throw new NotYours('You don\'t own this pl8')
    }

    comment.set(req.body)
    const savedPl8 = await pl8.save()

    res.send(savedPl8)
  } catch (e) {
    next(e)
  }
}

async function remove(req, res, next) {
  try {
    const { pl8Id, commentId } = req.params

    const pl8 = await Pl8.findById(pl8Id)

    if (!pl8) {
      throw new NotFound('Pl8 not found.')
    }

    const comment = pl8.comments.id(commentId)

    if (!req.currentM8._id.equals(comment.m8)) {
      throw new NotYours('You don\'t own this pl8')
    }
    
    await pl8.deleteOne()

    res.sendStatus(204)

  } catch (e) {
    next(e)
  }
}

export default {
  create,
  edit,
  remove,
}