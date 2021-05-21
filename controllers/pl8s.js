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



async function search(req, res, next) {
  try {
    const searchParams = req.query
    console.log(searchParams)

    const pl8List = await Character.find(searchParams).populate('user')

    res.status(200).json(pl8List)
  } catch (e) {
    next(e)
  }
}

export default {
  index,
  search,
}