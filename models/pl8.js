import mongoose from 'mongoose'

const { Schema, model } = mongoose

const comment = new Schema({
  text: { type: String, required: true },
  m8: { type: Schema.ObjectId, ref: 'M8', required: true },
}, {
  timestamps: true,
})

const pl8 = new Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  description: { type: String, required: true },
  r8ings: { 
    type: [Number], 
    required: true, 
    validate: [
      { validator: r8ing => r8ing >= 0 && r8ing <= 8, msg: 'R8ing must be between 8 and 8' }
    ],    
  },
  image: { type: String, required: true },
  ingredients: { type: [String], required: true },
  recipe: { type: [String], required: true },
  m8: { type: Schema.ObjectId, required: true },
  prepTime: { type: Number, required: true },
  cookTime: { type: Number, required: true },
  comments: { type: [comment] },
})

export default model('Pl8', pl8)