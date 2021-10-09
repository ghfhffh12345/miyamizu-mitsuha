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
            let line = parseInt(line, 10) - 1
            let number = parseInt(number, 10)

            if (this.cheakStoneInGame(line, number)) {
                this.gameData[line].push({ number: number, stone: this.userData[0].stone })
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
        this.gameData.forEach(element => {
            element.forEach(element2 => {
                let cheak = element.find(e => e.number + 1 == element2.number)
                if (cheak) {
                    
                }
            })
        })
    }
}

exports.Omok = Omok