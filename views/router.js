import express from 'express'

import pl8Controller from '../controllers/pl8s.js'

const router = express.Router()

router.route('/pl8s')
  .get(pl8Controller.index)
  .post(pl8Controller.create)

router.route('/pl8')
  .get(pl8Controller.index)
  .post(pl8Controller.create)

router.route('/pl8/search')
  .get(pl8Controller.search)

router.route('/pl8/:id')
  .get(pl8Controller.show)
  .delete(pl8Controller.remove)
  .put(pl8Controller.edit)

export default router