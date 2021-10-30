const { BlockGameRendering } = require("../BlockGameRendering");

class TetrisGameRendering extends BlockGameRendering {
    constructor (games) {
        if (games) {
            super(games.gameData)
            this.userData = games.userData
        } else {
            super([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []])
        }
    }

    TetrisRendering() {
        return this.gameDataRendering()
    }

    static getBlockData() {
        return [
            [1, 0, 1 ,1 ,1],
            [2, 1, 0, 1 ,1 ,1],
            [1, 1, 0, 2, 1, 1],
            [1, 1, 1],
            [1, 1],
            [2, 1, 0, 1, 1, 1, 0, 1]
        ]
    }

    LineProcessing(secondary_arg, element, index, element2) {
        const block = TetrisGameRendering.getBlockData()[element2.block]
        let lineIndex = 0
        let lineNumber = element2.number
        block.forEach(value, blockIndex => {
            switch (value) {
                case 1:
                    secondary_arg[index + lineIndex] = BlockGameRendering.stringChange(secondary_arg[index + lineIndex], 'a', lineNumber + blockIndex)
                case 0:
                    lineNumber = 0
            }
        })
    }
}

exports.TetrisGameRendering = TetrisGameRendering