import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'

import pl8Data from './data/pl8Data.js'
import m8Data from './data/m8Data.js'
import Pl8 from '../models/pl8.js'
import M8 from '../models/m8.js'

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('You have been connected M8')

    await mongoose.connection.db.dropDatabase()

    const m8s = await M8.create(m8Data)
    const newPl8Data = pl8Data.map(pl8 => {
      return { ...pl8, m8: m8s[0]._id }
    })
    const pl8s = await Pl8.create(newPl8Data)
    
    const myComment = { text: 'Perfect dish', m8: m8s[0]._id }
    
    const pl8ToCommentOn = pl8s[0]
    
    pl8ToCommentOn.comments.push(myComment)
    await pl8ToCommentOn.save()
    
    await mongoose.connection.close()
    
    console.log('here')
  } catch (error) {
    console.log('Something went wrong')
    console.log('error', error)
    
    await mongoose.connection.close()
  }
}

seedDatabase()