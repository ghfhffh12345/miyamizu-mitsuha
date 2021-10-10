const { Games } = require("./Games")

class Tetris extends Games {
    constructor (games){
        if (games) {
            this.userId = games.userId
            this.gameData = games.gameData
            this.blockData = games.blockData
        }
    }
}

exports.Tetris = Tetris