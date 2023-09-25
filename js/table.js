const table = document.getElementById('res-table')

function addTableRow(index, {x, y, r, hit, date, time}) {
    const row = table.insertRow(table.rows.length)
    row.insertCell(0).innerHTML = index
    row.insertCell(1).innerHTML = x
    row.insertCell(2).innerHTML = y
    row.insertCell(3).innerHTML = r
    row.insertCell(4).innerHTML = hit
    row.insertCell(5).innerHTML = date
    row.insertCell(6).innerHTML = time
}

function resetTable() {
    while (table.rows.length > 2)
        table.deleteRow(-1)
    localStorage.clear()
}

function fillTable() {
    for (let i = 1; i <= localStorage.length; i++)
        addTableRow(i, JSON.parse(localStorage.getItem(String(i))))
}

function addIncorrectRow(response) {
    const reason = response.getResponseHeader('x-status-reason')
    const row = table.insertRow(table.rows.length)
    const cell = row.insertCell(0)
    cell.innerHTML = reason
    cell.colSpan = 7
    cell.style.color = 'red'
}