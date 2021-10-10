class Games {
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
}

exports.Games = Games