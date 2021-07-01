import app from './app.js'
import connectToDb from './db/connectToDb.js'
import { port } from './config/environment.js' //* <-- This is new

async function startApp() {
  try {
    await connectToDb()
    console.log('Database has connected!')

    app.listen(port, () => console.log('Express is now running'))
  } catch (e) {
    console.log('Something went wrong starting app..')
    console.log(e)
  }
}

startApp()