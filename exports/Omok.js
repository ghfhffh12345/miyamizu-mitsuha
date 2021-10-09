class Omok {
    constructor(games) {
        if (games) {
            this.userData = games.userData
            this.gameData = games.gameData
        }
    }

    gameDataRendering() {
        let RenderingData = '⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟\n'
        let NumberData = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
        let lineData

        this.gameData.forEach((element, index) => {
            RenderingData += NumberData[index]
            lineData = '⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛'

            element.forEach(stonData => {
                lineData = this.lineDataChange(lineData, stonData.number, stonData.stone)
            })

            RenderingData += lineData + '\n'
        })

        return `<@${this.userData[0].id}>\n` + RenderingData.replace(/a/gi, '🔵').replace(/b/gi, '🔴')
    }

    lineDataChange(lineData, number, change) {
        return lineData.substring(0, number - 1) + change + lineData.substring(number, lineData.length)
    }

    setUsersData(first_user, second_user) {
        this.userData = [{ id: first_user, stone: 'a' }, { id: second_user, stone: 'b' }]
        this.gameData = [[], [], [], [], [], [], [], [], [], []]
    }

    pushData(userId, line, number) {
        if (this.userData[0].id == userId) {
            let _line = parseInt(line, 10) - 1
            let _number = parseInt(number, 10)

            if (this.cheakStoneInGame(_line, number)) {
                this.gameData[_line].push({ number: _number, stone: this.userData[0].stone })
                this.userData.push(this.userData[0])
                this.userData.shift()
            }
        }
    }

    cheakStoneInGame(line, number) {
        if (this.gameData[line].find(e => e.number == number)) return false
        return true
    }

    getGames() {
        return { userData: this.userData, gameData: this.gameData }
    }

    cheakGameOver() {
        for (var i = 0; i < this.gameData.length; i++) {
            for (var j = 0; j < this.gameData[i].length; j++) {
                let lineCount = this.horizontal_Right(this.gameData[i], this.gameData[i][j], 1)
                lineCount += this.horizontal_Left(this.gameData[i], this.gameData[i][j], 1) - 1
                if (lineCount == 5) return true
            }
        }
        return false
    }

    horizontal_Right(array, element, number) {
        const findData = array.find(e => (e.number == element.number + number) && (e.stone == element.stone))
        if (findData != undefined) return this.horizontal_Right(array, element, number + 1)
        return number
    }

    horizontal_Left(array, element, number) {
        const findData = array.find(e => (e.number == element.number - number) && (e.stone == element.stone))
        if (findData != undefined) return this.horizontal_Left(array, element, number + 1)
        return number
    }
}

exports.Omok = Omok