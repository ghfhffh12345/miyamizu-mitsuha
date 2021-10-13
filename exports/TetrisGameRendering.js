const { BlockGameRendering } = require("./BlockGameRendering");

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
}

exports.TetrisGameRendering = TetrisGameRendering