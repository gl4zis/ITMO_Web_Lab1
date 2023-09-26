import {yField, validateY} from "./validation.js"
import {processForm} from "./form.js"
import {addIncorrectRow, refillTable} from "./table.js"
import {cv, paintGraph, rField, sendClickCoords} from "./canvas.js"

cv.onclick = sendClickCoords
rField.onchange = paintGraph
yField.oninput = validateY
document.getElementById('submit').onclick = processForm
document.getElementById('reset').onclick = function () {
    resetTable()
    paintGraph()
}
window.onload = function () {
    getTable()
    paintGraph()
}

function getTable() {
    superagent
        .get('script.php')
        .then(processResponse)
}

export function submit(x, y, r) {
    superagent
        .get("script.php")
        .query({"X": +Number(x).toFixed(4), "Y": +Number(y).toFixed(4), "R": r})
        .then(processResponse)
}

function resetTable() {
    const table = document.getElementById('res-table')
    const rows = table.rows.length
    for (let i = 2; i < rows; i++)
        table.deleteRow(-1)
    superagent
        .get("script.php")
        .query({"delete": true})
        .then(processResponse)
}

function processResponse(response) {
    const body = response.body
    if (body.status === 200)
        addHit(body.table)
    else
        addIncorrectRow(body['status-reason'])
}

function addHit(htmlTable) {
    refillTable(htmlTable)
    /*const date = new Date().toLocaleString()
    localStorage.setItem(localStorage.length+1, JSON.stringify({x, y, r, hit, date, time}))
    addTableRow(localStorage.length, {x, y, r, hit, date, time})
    paintNewDot({x, y, hit})*/
}