import { prisma} from "../prisma/db.mjs"

const createSession = async (req, res, next ) => {
    const session =  await prisma.gameSession.create({
        data: {
            gameID: req.body.gameID
        }
    })
    res.json({msg: "sucessful", session})
}

const addPlayer = async(req, res, next) => {
    //TODO: add player to game session
    res.json({msg: "addPlayer"})
}
const listSession = async(req, res, next) => {
    const gameID = req.params.game_id * 1
    const session  = await prisma.gameSession.findMany({
        where: {
            gameID: gameID
        }
    })
    res.json({msg: "list session", session })
}

export { createSession, addPlayer, listSession}