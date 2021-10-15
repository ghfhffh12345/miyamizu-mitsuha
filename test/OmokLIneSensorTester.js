const { OmokLineSensor } = require("../class/Block/Omok/OmokLineSensor");

class OmokLineSensorTester {
    horizontalTester() {
        const sensor = new OmokLineSensor([[{ number: 1, block: 'a'}, { number: 2, block: 'a' }, { number: 3, block: 'a' }]])
        let result = sensor.horizontal_Left(sensor.gameData[0], { number: 4, block: 'a'})
        if (result != 3) throw new Error(`function 'horizontal_Left' is abnormal`)
        result = sensor.horizontal_Right(sensor.gameData[0], { number: 1, block: 'a' })
        if (result != 2) throw new Error(`function 'horizontal_Right' is abnormal`)
    }

    verticalTester() {
        const sensor = new OmokLineSensor([[{ number: 1, block: 'a' }], [{ number: 1, block: 'a' }], [{ number: 1, block: 'a' }], [{ number: 1, block: 'a' }]])
        let result = sensor.vertical_Bottom({ number: 1, block: 'a' }, 0)
        if (result != 3) throw new Error(`function 'vertical_Bottom' is abnormal`)
        result = sensor.vertical_Top({ number: 1, block: 'a' }, 3)
        if (result != 3) throw new Error(`function 'vertical_Top' is abnormal`)
    }

    diagonalTester() {
        const sensor = new OmokLineSensor([[{ number: 3, block: 'a' }], [{ number: 2, block: 'a' }], [{ number: 1, block: 'a' }]])
        let result = sensor.diagonal_Top_Right({ number: 1, block: 'a' }, 2)
        if (result != 2) throw new Error(`function 'diagonal_Top_Right' is abnormal`)
        result = sensor.diagonal_Bottom_Left({ number: 3, block: 'a' }, 0)
        if (result != 2) throw new Error(`function 'diagonal_Bottom_Left' is abnormal`)
        sensor.gameData = [[{ number: 1, block: 'a' }], [{ number: 2, block: 'a' }], [{ number: 3, block: 'a' }]]
        result = sensor.diagonal_Top_Left({ number: 3, block: 'a' }, 2)
        if (result != 2) throw new Error(`function 'diagonal_Top_Left' is abnormal`)
        result = sensor.diagonal_Bottom_Right({ number: 1, block: 'a' }, 0)
        if (result != 2) throw new Error(`function 'diagonal_Bottom_Right' is abnormal`)
    }
}

exports.OmokLineSensorTester = OmokLineSensorTester