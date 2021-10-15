class OmokLineSensor {
    constructor (gameData) {
        this.gameData = gameData
    }

    horizontal(array, element) {
        const findData = array.find(e => (e.number == element.number) && (e.block == element.block))
        if (findData) return 1
    }

    horizontal_Right(array, element) {
        const { number, block } = element
        let result = 0
        for (let i = 1; i + number <= array.length; i++) {
            const horizontalVal = this.horizontal(array, { number: number + i, block })
            if (horizontalVal) {
                result += horizontalVal
            } else break
        }
        return result
    }

    horizontal_Left(array, element) {
        const { number, block } = element
        let result = 0
        for (let i = 1; number - i >= 0; i++) {
            const horizontalVal = this.horizontal(array, { number: number - i, block })
            if (horizontalVal) {
                result += horizontalVal
            } else break
        }
        return result
    }

    vertical(element, line) {
        const findData = this.gameData[line].find(e => (e.number == element.number) && (e.stone == element.stone))
        if (findData) return 1
    }

    vertical_Top(element, line) {
        let result = 0
        for (let i = line; i >= 0; i--) {
            const verticalVal = this.vertical(element, i)
            if (verticalVal) {
                result += verticalVal
            } else break
        }
        return --result
    }

    vertical_Bottom(element, line) {
        let result = 0
        for (let i = line; i < this.gameData.length; i++) {
            const verticalVal = this.vertical(element, i)
            if (verticalVal) {
                result += verticalVal
            } else break
        }
        return --result
    }

    diagonal_Top_Right(element, line) {
        const { number, block } = element
        let result = 0
        for (let i = 1; line - i >= 0; i++) {
            const diagonalVal = this.horizontal(this.gameData[line - i], { number: number + i, block })
            if (diagonalVal) {
                result += diagonalVal
            } else break
        }
        return result
    }

    diagonal_Top_Left(element, line) {
        const { number, block } = element
        let result = 0
        for (let i = 1; line - i >= 0; i++) {
            const diagonalVal = this.horizontal(this.gameData[line - i], { number: number - i, block })
            if (diagonalVal) {
                result += diagonalVal
            } else break
        }
        return result
    }

    diagonal_Bottom_Left(element, line) {
        const { number, block } = element
        let result = 0
        for (let i = 1; line + i < this.gameData.length; i++) {
            const diagonalVal = this.horizontal(this.gameData[line + i], { number: number - i, block })
            if (diagonalVal) {
                result += diagonalVal
            } else break
        }
        return result
    }

    diagonal_Bottom_Right(element, line) {
        const { number, block } = element
        let result = 0
        for (let i = 1; line + i < this.gameData.length; i++) {
            const diagonalVal = this.horizontal(this.gameData[line + i], { number: number + i, block })
            if (diagonalVal) {
                result += diagonalVal
            } else break
        }
        return result
    }
}

exports.OmokLineSensor = OmokLineSensor