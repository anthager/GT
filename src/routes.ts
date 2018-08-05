import { Router } from 'express'
import { newPlayer } from './controllers/player.controller'

export const router = Router()

router.route('/player').post(newPlayer)
router.route('/').get((req, res) => res.json('working mate'))
