const input = document.getElementById('input')
const button = document.getElementById('button')
const result = document.getElementById('result')
const serverUrl = 'https://api.genderize.io'

button.addEventListener('click', sendRequest)
input.addEventListener("keydown", function (e) {
    if (e.code === 'Enter') {
        sendRequest()
    }
})

function sendRequest() {
    const firstName = input.value
    const url = `${serverUrl}?name=${firstName}`
    fetch(url)
        .then(response => response.json())
        .then((item) => {
            try {
                const isNotGender = item.gender === null || item.gender === undefined
                if (isNotGender) {
                    throw new Error('unknown gender')
                }
                result.textContent = `${firstName} - ${item.gender}`
            } catch (e) {
                result.textContent = `${firstName} - ${e.message}`
            }
        })
}