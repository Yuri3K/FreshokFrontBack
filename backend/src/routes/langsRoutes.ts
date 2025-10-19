import express from 'express'
import langsController from '../controllers/langsController'
import verifyToken from '../utils/verify-token'


const router = express.Router()

router.get('/langs', verifyToken, langsController.getLangs)

export default router