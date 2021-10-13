const { OmokLineSet } = require("./OmoklineSet");

class Omok extends OmokLineSet {
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
        let elements = [ cheakDataList, cheakData, 1 ]
        if (this.horizontal_Right(...elements) + this.horizontal_Left(...elements) == 6) return true

        // vertical comparison
        elements = [ cheakData, this.line, 1 ]
        if (this.vertical_Top(...elements) + this.vertical_Bottom(...elements) == 6) return true

        // diagonal right comparison
        if (this.diagonal_Top_Right(...elements) + this.diagonal_Bottom_Left(...elements) == 6) return true

        // diagonal left comparison
        if (this.diagonal_Top_Left(...elements) + this.diagonal_Bottom_Right(...elements) == 6) return true
        return false
    }

    horizontal_Right(array, element, number) {
        return this.horizontal(array, element, number, (n, n2) => n + n2)
    }

    horizontal_Left(array, element, number) {
        return this.horizontal(array, element, number, (n, n2) => n - n2)
    }

    vertical_Top(element, line, number) {
        return this.vertical(element, line, number, (n, n2) => n - n2, e => e >= 0)
    }

    vertical_Bottom(element, line, number) {
        return this.vertical(element, line, number, (n, n2) => n + n2, e => e < this.gameData.length)
    }

    diagonal_Top_Right(element, line, number) {
        return this.diagonal(element, line, number, (n, n2) => n - n2, e => e >= 0, (n, n2) => n + n2)
    }

    diagonal_Top_Left(element, line, number) {
        return this.diagonal(element, line, number, (n, n2) => n - n2, e => e >= 0, (n, n2) => n - n2)
    }

    diagonal_Bottom_Right(element, line, number) {
        return this.diagonal(element, line, number, (n, n2) => n + n2, e => e < this.gameData.length, (n, n2) => n + n2)
    }

    diagonal_Bottom_Left(element, line, number) {
        return this.diagonal(element, line, number, (n, n2) => n + n2, e => e < this.gameData.length, (n, n2) => n - n2)
    }
}

exports.Omok = Omok