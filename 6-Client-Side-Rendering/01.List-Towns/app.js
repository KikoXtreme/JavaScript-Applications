import { html, render } from './node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(ev) {
    ev.preventDefault();
    const towns = document.getElementById('towns').value.split(',').map(t => t.trim());
    const container = document.querySelector('#root');

    render(cityTemplate(towns), container);
}

const cityTemplate = (towns) => html`
<ul>
    ${towns.map(t => html`<li>${t}</li>`)}
</ul>`;