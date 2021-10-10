const { Games } = require("./Games")

class Tetris extends Games {
    constructor (games){
        if (games) {
            this.userId = games.userId
            this.gameData = games.gameData
        }
        // 1 means 1 block, 0 means a newline, and 2 means a space
        this.blockData = [
            [1, 0, 1, 1, 1],
            [1, 1],
            [1, 1, 1],
            [1],
            [2, 1, 0, 1, 1, 1, 0, 1]
        ]
    }

    setUsersData(userId) {
        this.userId = userId
        this.gameData = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
    }

    pushData() {
        const block = this.blockData[Math.floor(Math.random() * this.blockData.length)]
        this.gameData[0].push({ number: 5, block })
    }

    
}

exports.Tetris = Tetris