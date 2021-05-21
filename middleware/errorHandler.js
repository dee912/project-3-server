export default function errorHandler(err, req, res, next) {
  console.log('There was an error')
  console.log(err.name)
  console.log(err)

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid parameter given' })
  }
  if (err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not found' })
  }
  if (err.name === 'NotYours') {
    return res.status(418).json({ message: 'This pl8 doesn\'t belong to you' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Missing/Incorrect parameters' })
  }

  res.sendStatus(500)

  next(err)
}