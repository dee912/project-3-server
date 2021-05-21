import mongoose from 'mongoose'
import { dbURL } from '../config/environment.js'

export default function connectToDb() {

  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }

  return mongoose.connect(dbURL, options)

}