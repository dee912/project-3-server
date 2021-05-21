import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'


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


m8.plugin(mongooseHidden({ defaultHidden: 
  { password: true, email: true, _id: true },
}))

export default model('M8', m8)