import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats as catData } from './catSeeder.js'


const catsTemplate = (data) => html`
<li>
    <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${() => onToggle(data)} class="showBtn">${data.info ? 'Hide' : 'Show'} status code</button>
        ${data.info ? html`<div class="status" id=${data.id}>
            <h4>Status Code: ${data.statusCode}</h4>
            <p>${data.statusMessage}</p>
        </div>` : null}
    </div>
</li>`

const main = document.getElementById('allCats');
catData.forEach(c => c.info = false);

function start() {
    render(html`<ul>${catData.map(catsTemplate)}</ul>`, main);
}

start();

function onToggle(data) {
    data.info = !data.info;
    start();
}