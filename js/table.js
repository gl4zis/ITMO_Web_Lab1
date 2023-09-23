const table = document.getElementById('res-table')

function addTableRow({x, y, r, hit, date, time}) {
    const index = table.rows.length
    const row = table.insertRow(index)
    row.insertCell(0).innerHTML = index-1
    row.insertCell(1).innerHTML = x
    row.insertCell(2).innerHTML = y
    row.insertCell(3).innerHTML = r
    row.insertCell(4).innerHTML = hit
    row.insertCell(5).innerHTML = date
    row.insertCell(6).innerHTML = time
}

function resetTable() {
    for (let i = 0; i < localStorage.length; i++)
        table.deleteRow(-1)
    localStorage.clear()
}

function fillTable() {
    for (let i = 1; i <= localStorage.length; i++)
        addTableRow(JSON.parse(localStorage.getItem(String(i))))
}