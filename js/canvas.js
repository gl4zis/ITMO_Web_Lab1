const cv = document.getElementById("canvas")
const ctx = cv.getContext('2d')
const rField = document.getElementById("R")
let rValue = rField.value
const h = cv.height
const w = h
const fontSize = w / 30
const R = w * 0.4

rField.onchange = function () {
    rValue = rField.value
    paintGraph()
}

function paintGraph() {
    ctx.clearRect(0, 0, w, h)

    ctx.strokeStyle = '#CCCCCC'
    ctx.fillStyle = '#00BFFF88'
    ctx.fillRect(w / 2 - R, h / 2 - R / 2, R, R / 2)
    ctx.beginPath()
    ctx.moveTo(w / 2, h / 2 - R / 2)
    ctx.lineTo(w / 2 + R / 2, h / 2)
    ctx.lineTo(w / 2, h / 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, R, 0, Math.PI / 2)
    ctx.lineTo(w / 2, h / 2)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.lineTo(w * (19 / 20), h * (9 / 20))
    ctx.moveTo(w, h / 2)
    ctx.lineTo(w * (19 / 20), h * (11 / 20))
    ctx.moveTo(w / 2, h)
    ctx.lineTo(w / 2, 0)
    ctx.lineTo(w * (9 / 20), h * (1 / 20))
    ctx.moveTo(w / 2, 0)
    ctx.lineTo(w * (11 / 20), h * (1 / 20))

    ctx.moveTo(w / 2 - R, h / 2 - 5)
    ctx.lineTo(w / 2 - R, h / 2 + 5)
    ctx.moveTo(w / 2 + R, h / 2 - 5)
    ctx.lineTo(w / 2 + R, h / 2 + 5)
    ctx.moveTo(w / 2 + R / 2, h / 2 - 5)
    ctx.lineTo(w / 2 + R / 2, h / 2 + 5)
    ctx.moveTo(w / 2 + 5, h / 2 + R)
    ctx.lineTo(w / 2 - 5, h / 2 + R)
    ctx.moveTo(w / 2 + 5, h / 2 - R / 2)
    ctx.lineTo(w / 2 - 5, h / 2 - R / 2)


    ctx.fillStyle = '#CCCCCC'
    ctx.font = 'bold ' + fontSize + 'pt Arial'
    ctx.fillText(rValue, w / 2 + R - fontSize / 2, h / 2 - fontSize / 2)
    ctx.fillText(-rValue, w / 2 - R - fontSize, h / 2 - fontSize / 2)
    ctx.fillText(-rValue, w / 2 + fontSize / 2, h / 2 + R + fontSize / 2)
    ctx.fillText(rValue/2, w / 2 + fontSize / 2, h / 2 - R / 2 + fontSize / 2)
    ctx.fillText(rValue/2, w / 2 + R / 2 - fontSize, h / 2 - fontSize / 2)

    ctx.stroke()

    paintAllDots()
}

function paintNewDot({x, y, hit}) {
    switch (hit) {
        case "NO":
            ctx.fillStyle = '#FF0000'
            break
        case "YES":
            ctx.fillStyle = '#00FF00'
    }
    const xCenter = w/2 + (R * x / rValue)
    const yCenter = h/2 - (R * y / rValue)
    ctx.beginPath()
    ctx.arc(xCenter, yCenter, w/100, 0, Math.PI*2, true)
    ctx.fill()
}

function paintAllDots() {
    for (let i = 1; i <= localStorage.length; i++) {
        const row = JSON.parse(localStorage.getItem(i))
        paintNewDot({x: row.x, y: row.y, hit: row.hit})
    }
}