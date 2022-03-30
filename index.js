const API = 'http://hp-api.herokuapp.com/api/characters';
const severusData = [];

const severus = document.getElementById('severus-card');
const severusIgm = document.createElement('img');
const severusName = document.createElement('p');
const severusAge = document.createElement('p');
severus.append(severusIgm, severusName, severusAge);

async function fetchData() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        severusData.push(data[7]);
        console.log(severusData);

        severusIgm.src = severusData[0].image;
        severusName.textContent = 'Navn: ' + severusData[0].name;
        severusAge.textContent = `Alder: ${2022 - severusData[0].yearOfBirth
            } år`;
    }
    catch (err) {
        console.log(err);
    }
}

fetchData();

function showBubble() {
    const talkingBubble = document.getElementById('talking-bubble-container');
    talkingBubble.classList.remove('bubble-container-hidden');
}

function hideBubble() {
    const talkingBubble = document.getElementById('talking-bubble-container');
    talkingBubble.classList.add('bubble-container-hidden');
}

severusIgm.addEventListener('mouseover', showBubble);
severusIgm.addEventListener('mouseleave', hideBubble);