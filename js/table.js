const table = document.getElementById('res-table')

export function addTableRow({x, y, r, hit, date, time}) {
    const row = table.insertRow(table.rows.length)
    row.insertCell(0).innerHTML = table.rows.length-2
    row.insertCell(1).innerHTML = x
    row.insertCell(2).innerHTML = y
    row.insertCell(3).innerHTML = r
    row.insertCell(4).innerHTML = hit
    row.insertCell(5).innerHTML = date
    row.insertCell(6).innerHTML = time
}

export function addIncorrectRow(reason) {
    const row = table.insertRow(table.rows.length)
    const cell = row.insertCell(0)
    cell.innerHTML = reason
    cell.colSpan = 7
    cell.style.color = 'red'
}