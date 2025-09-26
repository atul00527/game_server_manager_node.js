// import { isRedisVersionLowerThan } from "bullmq"
import { DB_ERROR_CODES, prisma }from "../prisma/db.mjs"
import {ServerError} from "../error.mjs"
import { spawn } from "child_process"

const addGame = async( req, res, next) => {
    // add validation

    const game = await prisma.game.create({
        data: {
            name: req.body.name,
            minPlayer: req.body.minPlayer,
            maxPlayer: req.body.maxPlayer
        }
    })
    res.json({ msg: "sucessful", game})
}

const listGame = async( req, res, next) => {
    const games = await prisma.game.findMany()
    res.json({ msg: "sucessful", games})
}
const requestGame = async( req, res, next) => {
    if (!req.body.gameID){
        throw new ServerError(400, "game id must be supplied")
    }
    
    let gameSession = await prisma.gameSession.findFirst ({
        where: {
            gameID: req.body.gameID,
            status: "WAITING"
        }
    })
    if (!gameSession) {
        gameSession = await prisma.gameSession.create({
            data: {
                gameID: req.body.gameID
            }
        })
    }
    let gameSessionPlayer;
    try {
    gameSessionPlayer = await prisma.gameSessionPlayer.create({
        data: {
            sessionID: gameSession.id,
            playerID: req.user.id
        }
    })
} catch (err) {
    if (err.code === DB_ERROR_CODES.UNIQUE_ERR) {
        throw new ServerError(400, "player is already add in this game session")
    }
    throw err 
    }
    const game = await prisma.game.findUnique ({
        where: {
        id : req.body.gameID
        }
    })
    const data = await prisma.gameSessionPlayer.aggregate({
        wherel: {
            sessionID: gameSession.id
        },
        _count: {
            playerID : true
        }
    })
    if (game.maxPlayer > data._count.playerID) {
        return res.json({          
         msg: "sucessful",
         gameID: req.body.gameID, 
         gameSession,
         gameSessionPlayer,
        data
        })
    }

    // Start Game 

    
}

export { addGame, listGame, requestGame }
