const form = document.getElementById('submit-form')
const table = document.getElementById('res-table')
const resetButton = document.getElementById('reset')

window.request = superagent
form.onsubmit = processForm
resetButton.onclick = resetTable
window.onload = fillTable

function processForm(e) {
    e.preventDefault()
    const x = setX()
    const y = document.getElementById('Y').value
    const r = document.getElementById('R').value
    submit(x, y, r)
    return false;
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
        .then(addNewTableRow)
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

function addNewTableRow({x, y, r, hit, time}) {
    const date = new Date().toLocaleString()
    localStorage.setItem(String(table.rows.length - 1), JSON.stringify({x, y, r, hit, date, time}))
    addTableRow({x, y, r, hit, date, time})
}

function addTableRow({x, y, r, hit, date, time}) {
    const index = table.rows.length
    const row = table.insertRow(index)
    row.insertCell(0).innerHTML = String(index-1)
    row.insertCell(1).innerHTML = x
    row.insertCell(2).innerHTML = y
    row.insertCell(3).innerHTML = r
    row.insertCell(4).innerHTML = hit
    row.insertCell(5).innerHTML = date
    row.insertCell(6).innerHTML = time
}

function resetTable() {
    for (let i = 0; i < localStorage.length; i++) {
        table.deleteRow(-1)
    }
    localStorage.clear()
}

function fillTable() {
    for (let i = 1; i <= localStorage.length; i++) {
        addTableRow(JSON.parse(localStorage.getItem(String(i))))
    }
}