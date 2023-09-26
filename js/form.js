import {submit} from './main.js'

document.getElementById('submit').onclick = function () {
    const x = setX()
    const y = document.getElementById('y').value
    const r = document.getElementById('r').value
    submit(x, y, r)
}

function setX() {
    for (let i = -2; i < 6; i++) {
        let x = document.getElementById(String(i))
        if (x.checked)
            return x.value
    }
}