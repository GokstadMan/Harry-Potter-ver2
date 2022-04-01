const API = 'http://hp-api.herokuapp.com/api/characters';
const severusData = [];
const students = [];
let uniqueStudents = [];

const generateStudentsBtn = document.querySelector('.start-class-btn');

const severus = document.getElementById('severus-card');
const severusImgContainer = document.createElement('div');
const severusIgm = document.createElement('img');
const severusName = document.createElement('p');
const severusAge = document.createElement('p');
severus.append(severusImgContainer, severusName, severusAge);
severusImgContainer.append(severusIgm);

function clearItems(el) {
    el.innerHTML = '';
}

function createNewStudent(arr, i) {
    const studentsActive = document.querySelectorAll('.student-container');
    const userAnswer = prompt('Ønsker du å slette? Skriv ja/nei');

    if (userAnswer === null || userAnswer.toLowerCase() !== 'ja') {
        return;
    } else {
        studentsActive[i].innerHTML = `
        <img class='student-img' src=${!arr[randomNumber].image ? "./assets/avatar.png" : arr[randomNumber].image} />
        <p>Navn: ${arr[randomNumber].name}</p>
        <p>Hus: ${arr[randomNumber].house ? arr[randomNumber].house : 'Intet hus'}</p>
        <button class='delete-student-btn'>Slett Elev</button>
        `;

        const deleteStudentBtn = document.querySelectorAll('.delete-student-btn');
        deleteStudent(deleteStudentBtn);
    }
}

function deleteStudent(deleteBtn) {
    deleteBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            randomNumber = Math.round(Math.random() * 101);
            createNewStudent(students, i);
        });
    });
}

function generateRandomStudents() {
    const studentsSet = new Set();

    while (studentsSet.size < 10) {
        let randomNumber = Math.round(Math.random() * 101);
        studentsSet.add(randomNumber);
    }

    uniqueStudents = [...studentsSet];
    console.log(uniqueStudents);
}

function createStudentsCards() {
    const pupilsContainer = document.querySelector('.pupils-container');

    clearItems(pupilsContainer);

    generateRandomStudents();

    uniqueStudents.forEach(student => {
        pupilsContainer.innerHTML += `
                <div class='student-container'>
                <img class='student-img' src=${!students[student].image ? "./assets/avatar.png" : students[student].image} />
                <p>Navn: ${students[student].name}</p>
                <p>Hus: ${students[student].house ? students[student].house : 'Intet hus'}</p>
                <button class='delete-student-btn'>Slett Elev</button>
                </div>
                `;

        document.querySelectorAll('.student-container').forEach(background => {
            const x = Math.floor(Math.random() * 100 + 80);
            const y = Math.floor(Math.random() * 100 + 80);
            const z = Math.floor(Math.random() * 100 + 80);
            const bgColor = "rgb(" + x + "," + y + "," + z + ")";
            background.style.background = bgColor;
        });
    });

    const deleteStudentBtn = document.querySelectorAll('.delete-student-btn');

    deleteStudent(deleteStudentBtn);
}

async function fetchData() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        severusData.push(data[7]);

        data.filter((student) => {
            if (student.hogwartsStudent === true) {
                students.push(student);
            }
        });

        severusIgm.src = severusData[0].image;
        severusName.textContent = 'Navn: ' + severusData[0].name;
        severusAge.textContent = `Alder: ${2022 - severusData[0].yearOfBirth
            } år`;


        generateStudentsBtn.addEventListener('click', () => {
            const pupilsContainer = document.querySelector('.pupils-container');
            pupilsContainer.classList.remove('container-hidden');
            createStudentsCards();
        });

    }
    catch (err) {
        console.log(err);
    }
}

fetchData();

function showBubble() {
    const talkingBubble = document.getElementById('talking-bubble-container');
    talkingBubble.classList.remove('container-hidden');
}


function hideBubble() {
    const talkingBubble = document.getElementById('talking-bubble-container');
    talkingBubble.classList.add('container-hidden');
}

severusImgContainer.addEventListener('mouseenter', showBubble);
severusImgContainer.addEventListener('mouseleave', hideBubble);