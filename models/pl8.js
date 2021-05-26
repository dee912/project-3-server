import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
const { Schema, model } = mongoose

const comment = new Schema({
  text: { type: String, required: true },
  m8: { type: Schema.ObjectId, ref: 'M8', required: true },
}, {
  timestamps: true,
})

const r8ing = new Schema({
  r8ing: { 
    type: Number, 
    required: true,
    validate: [
      { validator: r8ing => r8ing >= 0 && r8ing <= 8, msg: 'R8ing must be between 0 and 8' }
    ],   
  },
  m8: { type: Schema.ObjectId, ref: 'M8', required: true },
})

const pl8 = new Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  description: { type: String, required: true },
  r8ings: { 
    type: [r8ing], 
    required: true,  
  },
  image: { type: String, required: true },
  ingredients: { type: [String], required: true },
  recipe: { type: [String], required: true },
  m8: { type: Schema.ObjectId, ref: 'M8', required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  comments: { type: [comment] },
})


r8ing.plugin(uniqueValidator)

export default model('Pl8', pl8)