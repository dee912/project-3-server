import express from 'express'

import pl8Controller from '../controllers/pl8s.js'
import m8sController from '../controllers/m8s.js'
// import commentController from '../controllers/comments'

const router = express.Router()

router.route('/pl8s')
  .get(pl8Controller.index)
  .post(pl8Controller.create)



router.route('/become-a-m8')
  .post(m8sController.register)
export default router