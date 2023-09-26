import {yField, validateY} from "./validation.js"
import {processForm} from "./form.js"
import {fillTable, addIncorrectRow, addTableRow, resetTable} from "./table.js"
import {cv, paintGraph, paintNewDot, rField, sendClickCoords} from "./canvas.js"

cv.onclick = sendClickCoords
rField.onchange = paintGraph
yField.oninput = validateY
document.getElementById('submit').onclick = processForm
document.getElementById('reset').onclick = function () {
    resetTable()
    paintGraph()
}
window.onload = function () {
    fillTable()
    paintGraph()
}


export function submit(x, y, r) {
    $.ajax({
        url: "script.php",
        dataType: "json",
        method: "GET",
        data: {"X": +Number(x).toFixed(4), "Y": +Number(y).toFixed(4), "R": r},
        success: processResponse
        }
    )
    /*request
        .get("script.php")
        .query({"X": +Number(x).toFixed(4), "Y": +Number(y).toFixed(4), "R": r})
        .then(processResponse)
    */
}

function processResponse(body) {
    if (body.status === 200)
        addHit(body.row)
    else
        addIncorrectRow(body['status-reason'])
}

function addHit({x, y, r, hit, time}) {
    const date = new Date().toLocaleString()
    localStorage.setItem(localStorage.length+1, JSON.stringify({x, y, r, hit, date, time}))
    addTableRow(localStorage.length, {x, y, r, hit, date, time})
    paintNewDot({x, y, hit})
}