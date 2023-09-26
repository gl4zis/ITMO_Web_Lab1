import {addIncorrectRow, addTableRow, fillTableFromLocal, resetTable} from "./table.js"
import {paintGraph, paintNewDot} from "./canvas.js"

document.getElementById('reset').onclick = function () {
    resetTable()
    paintGraph()
}
window.onload = function () {
    paintGraph()
    fillTableFromLocal()
}

export function submit(x, y, r) {
    superagent
        .get("script.php")
        .query({"X": +Number(x).toFixed(4), "Y": +Number(y).toFixed(4), "R": r})
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
    const newTable = document.createElement('table')
    newTable.innerHTML = htmlTable
    if (newTable.rows.length > 0) {
        const htmlRow = newTable.rows[newTable.rows.length - 1]
        const row = {
            x: htmlRow.cells[1].innerText,
            y: htmlRow.cells[2].innerText,
            r: htmlRow.cells[3].innerText,
            hit: htmlRow.cells[4].innerText,
            date: new Date().toLocaleString(),
            time: htmlRow.cells[6].innerText,
        }
        localStorage.setItem(localStorage.length+1, JSON.stringify(row))
        addTableRow(row)
        paintNewDot({x: row.x, y: row.y, hit: row.hit})
    }
}