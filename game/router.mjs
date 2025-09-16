import express from 'express'
const gameRouter = express.Router()
import  { addGame, listGame} from "./controller.mjs"
import { authentication } from '../auth.mjs'

gameRouter.use(authentication)

gameRouter
    .post('/', addGame)
    .post('/', listGame)

export default  gameRouter