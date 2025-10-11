import express from 'express'
import langsController from '../controllers/langsController'

const router = express.Router()

router.get('/langs', langsController.getLangs)

export default router