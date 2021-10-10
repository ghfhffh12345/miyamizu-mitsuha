class Games {
    constructor(games) {
        if (games) {
            this.userData = games.userData
            this.gameData = games.gameData
        }
    }

    gameDataRendering() {
        let lineData = this.getBaseLine()

        this.gameData.forEach((element, index) => {
            const LineIndex = index + 1
            element.forEach(stonData => {
                lineData[LineIndex] = this.StringChange(lineData[LineIndex], stonData.number, stonData.stone)
            })
            lineData[LineIndex] = this.getNumberList()[index] + lineData[LineIndex]
        })

        return `<@${this.userData[0].id}>\n` + lineData.join('\n').replace(/a/gi, '🔵').replace(/b/gi, '🔴')
    }

    StringChange(string, number, change) {
        return string.substring(0, number - 1) + change + string.substring(number, string.length)
    }

    getNumberList() {
        return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
    }

    getBaseLine() {
        const BaseLine = ['⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟']
        const NumberList = this.getNumberList()
        for (let i = 0; i < 10; i++) {
            BaseLine.push(`⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛`)
        }
        return BaseLine
    }
}

exports.Games = Games