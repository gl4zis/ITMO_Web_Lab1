import {submit} from './main.js'

export function processForm(e) {
    e.preventDefault()
    const x = setX()
    const y = document.getElementById('Y').value
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