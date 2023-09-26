import {yField, validateY} from "./validation.js"
import {processForm} from "./form.js"
import {addIncorrectRow, addTableRow} from "./table.js"
import {cv, paintGraph, paintNewDot, rField, sendClickCoords} from "./canvas.js"

cv.onclick = sendClickCoords
rField.onchange = function () {
    paintGraph()
    setHitsFromLocal()
}
yField.oninput = validateY
document.getElementById('submit').onclick = processForm
document.getElementById('reset').onclick = function () {
    resetTable()
    paintGraph()
}
window.onload = function () {
    paintGraph()
    setHitsFromLocal()
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
    localStorage.clear()
    const table = document.getElementById('res-table')
    const rows = table.rows.length
    for (let i = 2; i < rows; i++)
        table.deleteRow(-1)
    superagent
        .get("script.php")
        .query({"delete": true})
}

function processResponse(response) {
    const body = response.body
    if (body.status === 200)
        addHit(body.table)
    else
        addIncorrectRow(body['status-reason'])
}

function addHit(htmlTable) {
    const newTable = document.createElement('table')
    newTable.innerHTML = htmlTable
    if (newTable.rows.length > 0) {
        const htmlRow = newTable.rows[newTable.rows.length - 1]
        const row = {
            x: htmlRow.cells[1].innerText,
            y: htmlRow.cells[2].innerText,
            r: htmlRow.cells[3].innerText,
            hit: htmlRow.cells[4].innerText,
            date: htmlRow.cells[5].innerText,
            time: htmlRow.cells[6].innerText,
        }
        localStorage.setItem(localStorage.length+1, JSON.stringify(row))
        addTableRow(row)
        paintNewDot({x: row.x, y: row.y, hit: row.hit})
    }
}

function setHitsFromLocal() {
    for (let i = 1; i <= localStorage.length; i++) {
        const row = JSON.parse(localStorage.getItem(i))
        addTableRow(row)
        paintNewDot({x: row.x, y: row.y, hit: row.hit})
    }
}