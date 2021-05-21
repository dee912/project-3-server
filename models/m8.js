import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
<<<<<<< HEAD
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
=======
>>>>>>> development

const { Schema, model } = mongoose

const m8 = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: false },
  password: { type: String, required: true },
  m8s: { type: [Schema.ObjectId], ref: 'M8', required: false },
  highScore: { type: Number, required: false },
  r8dPl8s: { type: [Schema.ObjectId], ref: 'Pl8', required: false },
})

<<<<<<< HEAD
m8.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  
  next()
})

m8.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

m8
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

m8
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'Should match password')
    }
    next()
  })

m8.plugin(uniqueValidator)
=======
>>>>>>> development
m8.plugin(mongooseHidden({ defaultHidden: 
  { password: true, email: true, _id: true },
}))

export default model('M8', m8)