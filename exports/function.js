function gameRendering(arrayData) {
    let RenderingData = '⬛1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟\n'
    let NumberData = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

    arrayData.forEach((value, index) => {
        RenderingData += NumberData[index]
        let lineData = '⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛'
        value.forEach(value2 => {
            if (value2.color == 'red') {
                lineData = numberChange(lineData, value2.number, '뱕')
            } else {
                lineData = numberChange(lineData, value2.number, '뷁')
            }
        })
        RenderingData += lineData + '\n'
    })
    return RenderingData.replace(/뷁/gi, '🔵').replace(/뱕/gi, '🔴')
}

function numberChange(string, number, change) {
    return string.substring(0, number - 1) + change + string.substring(number, string.length)
}

function tgameRendering(arrayData) {
    
}

exports.gameRendering = gameRendering