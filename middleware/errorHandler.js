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
    if (err.errors.name) {
      errorToReturn.name = err.errors.name.message
    }
    if (err.errors.origin) {
      errorToReturn.origin = err.errors.origin.message
    }
    if (err.errors.description) {
      errorToReturn.description = err.errors.description.message
    }
    if (err.errors.ingredients) {
      errorToReturn.ingredients = err.errors.ingredients.message
    }
    if (err.errors.recipe) {
      errorToReturn.recipe = err.errors.recipe.message
    }
    if (err.errors.prepTime) {
      errorToReturn.prepTime = err.errors.prepTime.message
    }
    if (err.errors.cookTime) {
      errorToReturn.cookTime = err.errors.cookTime.message
    }
    return res.status(400).json( errorToReturn )
  }
  if (err.name === 'EmailNotUnique') {
    return res.status(400).json({ email: 'This email is already taken' })
  }
  if (err.name === 'MongoError') {
    return res.status(400).json({ username: 'This username is alreay taken' })
  }
  if (err.name === 'NoPassword') {
    return res.status(400).json({ password: 'A password is required' })
  }

  res.sendStatus(500)

  next(err)
}