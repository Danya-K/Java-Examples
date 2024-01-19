document.addEventListener('DOMContentLoaded', () => {
    displayStudents();
    });
    5
    function addStudent() {
    let studentName = document.getElementById('studentName').value;
    if (studentName) {
    let students = getStudents();
    students.push(studentName);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
    document.getElementById('studentName').value = ''; // Clear input field
    }
    }
    function getStudents() {
    let storedStudents = localStorage.getItem('students');
    if (storedStudents) {
    return JSON.parse(storedStudents);
    } else {
    return [];
    }
    }
    function displayStudents() {
    let students = getStudents();
    let studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear existing list
    students.forEach((student) => {
    let li = document.createElement('li');
    li.textContent = student;
    studentList.appendChild(li);
    });
    }