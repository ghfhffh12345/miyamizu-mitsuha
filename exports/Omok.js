const { BlockGameRendering } = require("./BlockGameRendering");

class Omok extends BlockGameRendering {
    constructor (games) {
        if (games) {
            super(games.gameData)
            this.userData = games.userData
        } else {
            super([[], [], [], [], [], [], [], [], [], []])
        }
    }

    OmokRendering() {
        return (this.getStartList() + '\n' + this.gameDataRendering()).replace(/a/gi, '🔵').replace(/b/gi, '🔴')
    }

    getStartList() {
        return ['⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟']
    }

    LineProcessing(result, index) {
        return this.getNumberList()[index] + result
    }

    getNumberList() {
        return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
    }

    setUsersData(first_user, second_user) {
        this.userData = [{ id: first_user, block: 'a' }, { id: second_user, block: 'b' }]
    }

    pushData(userId, line, number) {
        this.line = parseInt(line, 10) - 1
        this.number = parseInt(number, 10)

        const format = !isNaN(this.line) && !isNaN(this.number) && this.userData[0].id == userId
            && this.line > -1 && this.line < 11 && this.number > 0 && this.number < 11
            && this.cheakStoneInGame(this.line, this.number)
        if (!format) return

        if (format) {
            this.gameData[this.line].push({ number: this.number, block: this.userData[0].block })
            this.userData.push(this.userData[0])
            this.userData.shift()
        } else {
            this.line = undefined
            this.number = undefined
        }
    }

    cheakStoneInGame(line, number) {
        if (this.gameData[line].find(e => e.number == number)) return false
        return true
    }

    getGames() {
        return { userData: this.userData, gameData: this.gameData }
    }

    getFirstUserId() {
        return this.userData[0].id
    }

    cheakGameOver() {
        if (this.line == undefined) return
        const cheakDataList = this.gameData[this.line]
        const cheakData = cheakDataList.find(e => e.number == this.number)

        // horizontal comparison
        let elements = { array: cheakDataList, element: cheakData, number: 1 }
        if (this.cheakGameOverLine((...args) => this.horizontal(...args), elements, (n, n2) => n - n2, (n, n2) => n + n2)) return true

        // vertical comparison
        elements = { element: cheakData, line: this.line, number: 1 }
        if (this.cheakGameOverLine((...args) => this.vertical(...args), elements,
        { comparison_value: (n, n2) => n - n2, comparison: e => e >= 0 },
        { comparison_value: (n, n2) => n + n2, comparison: e => e < this.gameData.length })) return true

        // diagonal right comparison
        if (this.cheakGameOverLine((...args) => this.diagonal(...args), elements,
        { comparison_value: (n, n2) => n - n2, comparison: e => e >= 0, comparison_value2: (n, n2) => n + n2 },
        { comparison_value: (n, n2) => n + n2, comparison: e => e < this.gameData.length, comparison_value2: (n, n2) => n - n2 })) return true

        // diagonal left comparison
        if (this.cheakGameOverLine((...args) => this.diagonal(...args), elements,
        { comparison_value: (n, n2) => n - n2, comparison: e => e >= 0, comparison_value2: (n, n2) => n - n2 },
        { comparison_value: (n, n2) => n + n2, comparison: e => e < this.gameData.length, comparison_value2: (n, n2) => n + n2 })) return true

        return false
    }

    cheakGameOverLine(func, elements, infunc, infunc2) {
        let lineCount = func(elements, infunc)
        lineCount += func(elements, infunc2) - 1
        if (lineCount == 5) return true
    }

    horizontal(data, comparison_value) {
        let { array, element, number } = data
        const findData = array.find(e => (e.number == comparison_value(element.number, number)) && (e.block == element.block))
        if (findData != undefined) return this.horizontal({ array, element, number: ++number }, comparison_value)
        return number
    }

    vertical(data, infunc) {
        let { element, line, number } = data
        const { comparison_value, comparison } = infunc

        const nowLine = comparison_value(line, number)
        if (comparison(nowLine)) {
            const findData = this.gameData[nowLine].find(e => (e.number == element.number) && (e.stone == element.stone))
            if (findData != undefined) return this.vertical({ element, line, number: ++number }, infunc)
        }
        return number
    }

    diagonal(data, infunc) {
        let { element, line, number } = data
        const { comparison_value, comparison, comparison_value2 } = infunc

        const nowLine = comparison_value(line, number)
        if (comparison(nowLine)) {
            const findData = this.gameData[nowLine].find(e => (e.number == comparison_value2(element.number, number)) && (e.stone == element.stone))
            if (findData != undefined) return this.diagonal({ element, line, number: ++number }, infunc)
        }
        return number
    }
}

exports.Omok = Omok