import { html, render } from './node_modules/lit-html/lit-html.js';

const rowTemplate = (student) => html`
<tr class=${student.match ? 'select' : '' }>
   <td>${student.item.firstName} ${student.item.lastName}</td>
   <td>${student.item.email}</td>
   <td>${student.item.course}</td>
</tr>`;

const tbody = document.querySelector('tbody');
const input = document.getElementById('searchField');
document.querySelector('#searchBtn').addEventListener('click', onSearch);

const url = 'http://localhost:3030/jsonstore/advanced/table';
let students; //array of objects
start();

async function start() {
   const res = await fetch(url);
   const data = await res.json();

   students = Object.values(data).map(s => ({ item: s, match: false }));

   update();
}

function update() {
   render(students.map(rowTemplate), tbody);
}

function onSearch() {
   const value = input.value.trim().toLocaleLowerCase();

   for (let student of students) {
      if (Object.values(student.item).some(v => value && v.toLocaleLowerCase().includes(value))) {
         student.match = true;
      } else {
         student.match = false;
      }
   }
   update();
}