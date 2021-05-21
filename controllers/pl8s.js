import Pl8 from '../models/pl8s.js'

async function index(req, res, next) {
  try {
    const pl8List = await Pl8.find()

    res.status(200).json(pl8List)
  } catch (e) {
    next(e)
  }
}

async function search(req, res, next) {
  try {
    const searchParams = req.query
    console.log(searchParams)

    const pl8List = await Character.find(searchParams).populate('user')

    res.status(200).json(characterList)
  } catch (e) {
    next(e)
  }
}