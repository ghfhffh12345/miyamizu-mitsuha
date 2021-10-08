const { Omok } = require("./Omok");

class Tetris extends Omok {
    constructor (games){
        if (games) {
            this.userData = games.userData
            this.gameData = games.gameData
            this.blockData = games.blockData
        }
    }

    getGames() {
        return { userData: this.userData, gameData: this.gameData, blockData: this.blockData }
    }
}

exports.Tetris = Tetris