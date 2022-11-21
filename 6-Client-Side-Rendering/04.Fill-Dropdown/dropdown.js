import { html, render } from './node_modules/lit-html/lit-html.js';


const selectTemplate = (items) => html`
<option value=${items._id}>${items.text}</option>`;

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const main = document.querySelector('select');
document.querySelector('form').addEventListener('click', addItems);

getData();

async function getData() {
    const res = await fetch(url);
    const data = await res.json();

    update(Object.values(data));
}

function update(items) {
    render(items.map(selectTemplate), main);
}

async function addItems(ev) {
    ev.preventDefault();
    const text = document.getElementById('itemText').value;
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    if (res.ok === true) {
        getData();
    }
    document.getElementById('itemText').value = '';
}