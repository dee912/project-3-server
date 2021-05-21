import express from 'express'
import router from './views/router.js'

const app = express()
// ! Order is important for these
app.use(express.json())
app.use('/api', router)
export default app