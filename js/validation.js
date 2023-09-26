const yField = document.getElementById('y')
const submitButton = document.getElementById('submit')
const regex = /^-?\d([\.,]\d{1,4})?$/

yField.oninput = function () {
    const y = parseFloat(yField.value.replace(',', '.'))
    if (!regex.test(yField.value) || y < -5 || y > 3) {
        yField.style.borderColor = '#FF0000'
        submitButton.disabled = true
    } else {
        yField.style.borderColor = '#00FF00'
        submitButton.disabled = false
    }
}

export function validatePoint(x, y) {
    return !(y < -5 || y > 3 || x < -2 || x > 5);
}