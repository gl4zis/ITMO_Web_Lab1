const form = document.getElementById('submit-form')
const resetButton = document.getElementById('reset')
const request = superagent

form.onsubmit = processForm
resetButton.onclick = function () {
    resetTable()
    paintGraph()
}
window.onload = function () {
    fillTable()
    paintGraph()
}

function processForm(e) {
    e.preventDefault()
    const x = setX()
    const y = document.getElementById('Y').value
    const r = document.getElementById('R').value
    submit(x, y, r)
}

function processCanvasClick(x, y) {
    const r = document.getElementById('R').value
    submit(x, y, r)
}

function setX() {
    for (let i = -2; i < 6; i++) {
        let x = document.getElementById(String(i))
        if (x.checked)
            return x.value
    }
}

function submit(x, y, r) {
    $.ajax({
        url: "script.php",
        dataType: "json",
        method: "GET",
        data: {"X": +Number(x).toFixed(4), "Y": +Number(y).toFixed(4), "R": r},
        success: addHit,
        error: addIncorrectRow
        }
    )
    /*request
        .get("script.php")
        .query({"X": +Number(x).toFixed(4), "Y": +Number(y).toFixed(4), "R": r})
        .ok(res => res.status < 500)
        .then(processResponse)
        .then(addHit)
        .catch(addIncorrectRow)*/
}
function addHit({x, y, r, hit, time}) {
    const date = new Date().toLocaleString()
    localStorage.setItem(localStorage.length+1, JSON.stringify({x, y, r, hit, date, time}))
    addTableRow(localStorage.length, {x, y, r, hit, date, time})
    paintNewDot({x, y, hit})
}