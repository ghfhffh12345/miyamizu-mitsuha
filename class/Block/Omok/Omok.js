const { BlockGameRendering } = require("../BlockGameRendering")
const { OmokLineSensor } = require("./OmokLineSensor")

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

    LineLastProcessing(result, index) {
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

        const LineAndNumberNaN = !isNaN(this.line) && !isNaN(this.number)
        const NowUser = this.userData[0].id == userId
        const LineOutOfRange = this.line > -1 && this.line < 11
        const NumberOutOfRange = this.number > 0 && this.number < 11

        if (LineAndNumberNaN && NowUser && LineOutOfRange && NumberOutOfRange && this.cheakStoneInGame(this.line, this.number)) {
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
        const element = cheakDataList.find(e => e.number == this.number)
        const lineSenser = new OmokLineSensor(this.gameData)

        if (lineSenser.horizontal_Left(cheakDataList, element) + lineSenser.horizontal_Right(cheakDataList, element) == 4) return true
        if (lineSenser.vertical_Top(element, this.line) + lineSenser.vertical_Bottom(element, this.line) == 4) return true
        if (lineSenser.diagonal_Top_Right(element, this.line) + lineSenser.diagonal_Bottom_Left(element, this.line) == 4) return true
        if (lineSenser.diagonal_Top_Left(element, this.line) + lineSenser.diagonal_Bottom_Right(element, this.line) == 4) return true
    }
}

exports.Omok = Omok