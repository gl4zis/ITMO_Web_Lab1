const cv = document.getElementById("canvas")

function paint() {
    console.log('painting...')
    const ctx = cv.getContext('2d')
    const height = cv.height
    const width = height
    const fontSize = width / 30
    const R = width * 0.4

    //ctx.fillStyle = '#101010'
    //ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#CCCCCC'
    ctx.fillStyle = '#00FF0066'
    ctx.fillRect(width / 2 - R, height / 2 - R / 2, R, R / 2)
    ctx.beginPath()
    ctx.moveTo(width / 2, height / 2 - R / 2)
    ctx.lineTo(width / 2 + R / 2, height / 2)
    ctx.lineTo(width / 2, height / 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, R, 0, Math.PI / 2)
    ctx.lineTo(width / 2, height / 2)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.lineTo(width * (19 / 20), height * (9 / 20))
    ctx.moveTo(width, height / 2)
    ctx.lineTo(width * (19 / 20), height * (11 / 20))
    ctx.moveTo(width / 2, height)
    ctx.lineTo(width / 2, 0)
    ctx.lineTo(width * (9 / 20), height * (1 / 20))
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width * (11 / 20), height * (1 / 20))

    ctx.moveTo(width / 2 - R, height / 2 - 5)
    ctx.lineTo(width / 2 - R, height / 2 + 5)
    ctx.moveTo(width / 2 + R, height / 2 - 5)
    ctx.lineTo(width / 2 + R, height / 2 + 5)
    ctx.moveTo(width / 2 + R / 2, height / 2 - 5)
    ctx.lineTo(width / 2 + R / 2, height / 2 + 5)
    ctx.moveTo(width / 2 + 5, height / 2 + R)
    ctx.lineTo(width / 2 - 5, height / 2 + R)
    ctx.moveTo(width / 2 + 5, height / 2 - R / 2)
    ctx.lineTo(width / 2 - 5, height / 2 - R / 2)


    ctx.fillStyle = '#CCCCCC'
    ctx.font = 'bold ' + fontSize + 'pt Arial'
    ctx.fillText('R', width / 2 + R - fontSize / 2, height / 2 - fontSize / 2)
    ctx.fillText('-R', width / 2 - R - fontSize, height / 2 - fontSize / 2)
    ctx.fillText('-R', width / 2 + fontSize / 2, height / 2 + R + fontSize / 2)
    ctx.fillText('R/2', width / 2 + fontSize / 2, height / 2 - R / 2 + fontSize / 2)
    ctx.fillText('R/2', width / 2 + R / 2 - fontSize, height / 2 - fontSize / 2)

    ctx.stroke()
}