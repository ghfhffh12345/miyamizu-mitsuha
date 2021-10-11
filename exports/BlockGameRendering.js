class BlockGameRendering {
    constructor (gameData) {
        this.gameData = gameData
    }

    gameDataRendering() {
        let result = this.gameBase()
        this.gameData.forEach((element, index) => {
            element.forEach(element2 => {
                result[index] = BlockGameRendering.stringChange(result[index], element2.block, element2.number)
            })
            result[index] = this.LineProcessing(result[index], index)
        })
        return result.join('\n')
    }

    gameBase() {
        const result = []
        for (let i = 0; i < this.gameData.length; i++) {
            result.push(this.getBaseLine(i))
        }
        return result
    }

    getBaseLine() {
        return '⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛'
    }

    LineProcessing() {
        return ''
    }

    static stringChange(string, change, index) {
        return string.substring(0, index - 1) + change + string.substring(index, string.length)
    }
}

exports.BlockGameRendering = BlockGameRendering