const form = document.getElementById('submit-form')
const resetButton = document.getElementById('reset')

window.request = superagent
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
    request
        .get("script.php")
        .query({"X": x, "Y": y, "R": r})
        .then(processResponse)
        .then(addHit)
        .catch()
}

function processResponse(response) {
    if (response.status === 200)
        return response.body
    else {
        console.log(response.headers.get('X-Status-Reason'))
        return Promise.reject()
    }
}

function addHit({x, y, r, hit, time}) {
    const date = new Date().toLocaleString()
    localStorage.setItem(localStorage.length+1, JSON.stringify({x, y, r, hit, date, time}))
    addTableRow({x, y, r, hit, date, time})
    paintNewDot({x, y, hit})
}