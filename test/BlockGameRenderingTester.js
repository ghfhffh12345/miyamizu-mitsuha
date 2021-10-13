const { BlockGameRendering } = require("../exports/BlockGameRendering");

class BlockGameRenderingTester extends BlockGameRendering {
    constructor () {
        super([[], [], [], [], [], [], [], [], [], []])
    }

    gameDataRenderingTester() {
        this.gameData = [[{ number: 1, block: 'a' }], [], [], [], [], [], [], [], [], []]
        if (this.gameDataRendering == '') return true
    }
}