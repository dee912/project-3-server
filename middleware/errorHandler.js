export default function errorHandler(err, req, res, next) {
  console.log('There was an error')
  console.log(err.name)

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
    const errorToReturn = {}
    if (err.errors.username) {
      errorToReturn.username = err.errors.username.message
    }
    if (err.errors.email) {
      errorToReturn.email = err.errors.email.message
    }
    if (err.errors.password) {
      errorToReturn.password = err.errors.password.message
    }
    return res.status(400).json( errorToReturn )
  }
  if (err.name === 'EmailNotUnique') {
    return res.status(400).json({ email: 'This email is already taken' })
  }
  if (err.name === 'MongoError') {
    return res.status(400).json({ username: 'This username is alreay taken' })
  }

  res.sendStatus(500)

  next(err)
}