const { BlockGameRendering } = require("./BlockGameRendering");

class OmokLineSet extends BlockGameRendering {
    constructor (gameData) {
        super(gameData)
    }

    horizontal(array, element, number, comparison_value) {
        const findData = array.find(e => (e.number == comparison_value(element.number, number)) && (e.block == element.block))
        if (findData != undefined) return this.horizontal(array, element, ++number, comparison_value)
        return number
    }

    vertical(element, line, number, comparison_value, comparison) {
        const nowLine = comparison_value(line, number)
        if (comparison(nowLine)) {
            const findData = this.gameData[nowLine].find(e => (e.number == element.number) && (e.stone == element.stone))
            if (findData != undefined) return this.vertical(element, line, ++number, comparison_value, comparison)
        }
        return number
    }

    diagonal(element, line, number, comparison_value, comparison, comparison_value2) {
        const nowLine = comparison_value(line, number)
        if (comparison(nowLine)) {
            const findData = this.gameData[nowLine].find(e => (e.number == comparison_value2(element.number, number)) && (e.stone == element.stone))
            if (findData != undefined) return this.diagonal(element, line, ++number, comparison_value, comparison, comparison_value2)
        }
        return number
    }
}

exports.OmokLineSet = OmokLineSet