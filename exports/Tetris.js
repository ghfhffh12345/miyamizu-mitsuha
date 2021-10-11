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
        const block = Math.floor(Math.random() * this.blockData.length)
        this.gameData[0].push({ number: 5, block })
    }

    gameDataRendering() {
        let RenderingData = this.getBaseRenderingData()
        this.gameData.forEach((value, index) => {
            value.forEach(element => {
                const LineChangeWith = this.blockWith(element, 0) + element.number
                RenderingData[index] = this.StringChange(RenderingData[index], LineChangeWith, 'a')
                for (let i = 0; i < this.blockData[element.block].length && this.blockWith(element, i) == 1; i++) {
                    
                }
            })
        })

        return RenderingData.join('\n')
    }

    getBaseRenderingData() {
        const result = []
        for (let i = 0; i < this.gameData.length; i++) {
            result.push('⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛')
        }
        return result
    }

    StringChange(string, number, change) {
        return string.substring(0, number - 1) + change + string.substring(number, string.length)
    }

    blockWith(element, number) {
        if (this.blockData[element.block][number] != 1) {
            return this.blockWith(element, number + 1)
        }
        return number
    }
}

exports.Tetris = Tetris