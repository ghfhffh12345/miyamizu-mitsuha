class Tetris {
    constructor (games){
        this.userId = games.userId

        // 1 means 1 block, 0 means a newline, and 2 means a space
        this.blockData = [
            [1, 0, 1, 1, 1],
            [1, 1],
            [1, 1, 1],
            [1],
            [2, 1, 0, 1, 1, 1, 0, 1]
        ]

        if (!games.gameData) {
            this.gameData = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
        } else {
            this.gameData = games.gameData
        }
    }

    pushData() {
        const block = this.blockData[Math.floor(Math.random() * this.blockData.length)]
        this.gameData[0].push({ number: 5, block })
    }

    gameDataRendering() {
        return this.getBaseRenderingData().join('\n')
    }

    getBaseRenderingData() {
        const result = []
        for (let i = 0; i < this.gameData.length; i++) {
            result.push('⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛')
        }
        return result
    }
}

exports.Tetris = Tetris