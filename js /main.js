import {UI_ELEMENT} from './view.js'

const SERVER_URL = 'https://api.genderize.io'
UI_ELEMENT.BUTTON.addEventListener('click', sendRequest)
UI_ELEMENT.INPUT.addEventListener("keydown", function (e) {
    if (e.code === 'Enter') {
        sendRequest()
    }
})

function sendRequest() {
    const firstName = UI_ELEMENT.INPUT.value
    const url = `${SERVER_URL}?name=${firstName}`
    fetch(url)
        .then(response => response.json())
        .then((item) => {
            try {
                const isNotGender = item.gender === null || item.gender === undefined
                if (isNotGender) {
                    throw new Error('unknown gender')
                }
                UI_ELEMENT.RESULT.textContent = `${firstName} - ${item.gender}`
            } catch (e) {
                UI_ELEMENT.RESULT.textContent = `${firstName} - ${e.message}`
            }
        })
}