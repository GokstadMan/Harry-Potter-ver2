import { API } from '../script/index.js';
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

function generateNewUniqueStudent(i) {
    uniqueStudents.splice(i, 1);

    generateRandomStudents();

    let newStudent = uniqueStudents[9];

    while (newStudent === uniqueStudents[i]) {
        uniqueStudents.pop();

        generateRandomStudents();

        newStudent = uniqueStudents[9];
    }

    uniqueStudents.splice(i, 0, newStudent);
    uniqueStudents.pop();
}

function createNewStudent(arr, i) {
    const studentsActive = document.querySelectorAll('.student-container');
    const userAnswer = prompt('Ønsker du å slette? Skriv ja/nei');

    if (userAnswer === null || userAnswer.toLowerCase() !== 'ja') {
        return;
    } else {
        generateNewUniqueStudent(i);

        const randomNumber = uniqueStudents[i];

        studentsActive[i].innerHTML = `
        <img class='student-img' alt='${!arr[randomNumber].image ? 'Missing image avatar' : arr[randomNumber].name + ' image'}' src=${!arr[randomNumber].image ? "./assets/avatar.png" : arr[randomNumber].image} />
        <p>Navn: ${arr[randomNumber].name}</p>
        <p>Hus: ${arr[randomNumber].house ? arr[randomNumber].house : 'Intet hus'}</p>
        <button class='delete-student-btn'>Slett elev</button>
    `;

        const deleteStudentBtn = document.querySelectorAll('.delete-student-btn');
        deleteStudentBtn[i].addEventListener('click', () => {
            createNewStudent(students, i);
        });
    }
}

function deleteStudent(deleteBtn) {
    deleteBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            createNewStudent(students, i);
        });
    });
}

function generateRandomStudents() {
    const studentsSet = new Set(uniqueStudents);

    while (studentsSet.size < 10) {
        const randomNumber = Math.round(Math.random() * (students.length - 1));
        studentsSet.add(randomNumber);
    }

    uniqueStudents = [...studentsSet];

    console.log(uniqueStudents);
}

function generateRandomColors(list) {
    list.forEach(background => {
        const bgColor = "hsl(" + 360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (85 + 10 * Math.random()) + '%)';
        background.style.background = bgColor;
    });
}

function createStudentsCards() {
    const pupilsContainer = document.querySelector('.pupils-container');

    clearItems(pupilsContainer);

    uniqueStudents = [];

    generateRandomStudents();

    uniqueStudents.forEach(student => {
        pupilsContainer.innerHTML += `
            <li class='student-container'>
                <img class='student-img' alt='${!students[student].image ? 'Missing image avatar' : students[student].name + ' image'}' src=${!students[student].image ? "./assets/avatar.png" : students[student].image} />
                <p>Navn: ${students[student].name}</p>
                <p>Hus: ${students[student].house ? students[student].house : 'Intet hus'}</p>
                <button class='delete-student-btn'>Slett elev</button>
            </li>
            `;

        const studentsActive = document.querySelectorAll('.student-container');

        generateRandomColors(studentsActive);
    });

    const deleteStudentBtn = document.querySelectorAll('.delete-student-btn');

    deleteStudent(deleteStudentBtn);
}

function filterStudents(data) {
    data.filter((student) => {
        if (student.hogwartsStudent === true) {
            students.push(student);
        }
    });
}

function displayTeacherDetails(data) {
    severusIgm.src = data[0].image;
    severusName.textContent = 'Navn: ' + data[0].name;
    severusAge.textContent = `Alder: ${2022 - data[0].yearOfBirth
        } år`;
}

function displayStudentsHandler() {
    generateStudentsBtn.addEventListener('click', () => {
        const pupilsContainer = document.querySelector('.pupils-container');
        pupilsContainer.classList.remove('container-hidden');
        createStudentsCards();
    });
}

async function fetchData() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        severusData.push(data[7]);
        filterStudents(data);
        displayTeacherDetails(severusData);
        displayStudentsHandler();
    }
    catch (err) {
        console.log(err);
    }
}

fetchData();

function removeEventLeave() {
    severusImgContainer.removeEventListener('mouseleave', hideBubble);
}

function removeEventEnter() {
    severusImgContainer.removeEventListener('mouseenter', showBubble);
}

function showBubble() {
    const talkingBubble = document.getElementById('talking-bubble-container');
    talkingBubble.classList.remove('container-hidden');
    severusImgContainer.addEventListener('mouseleave', hideBubble);
    removeEventEnter();
}

function hideBubble() {
    const talkingBubble = document.getElementById('talking-bubble-container');
    talkingBubble.classList.add('container-hidden');
    severusImgContainer.addEventListener('mouseenter', showBubble);
    removeEventLeave();
}

showBubble();
hideBubble();