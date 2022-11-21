import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats as catData } from './catSeeder.js'

const container = document.getElementById('allCats');
const ulElement = document.createElement('ul');
container.appendChild(ulElement);
ulElement.addEventListener('click', onDetails);

const catsTemplate = (data) => html`
<li>
    <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id=${data.id}>
            <h4>Status Code: ${data.statusCode}</h4>
            <p>${data.statusMessage}</p>
        </div>
    </div>
</li>`

// function start() {
render(catData.map(catsTemplate), ulElement);
// }
// start();

function onDetails(ev) {
    if (ev.target.tagName === 'BUTTON') {
        const detailsDiv = ev.target.parentElement.querySelector('.status');

        if (detailsDiv.style.display === 'block') {
            detailsDiv.style.display = 'none';
            ev.target.textContent = 'Show status code';
        } else {
            detailsDiv.style.display = 'block';
            ev.target.textContent = 'Hide status code';
        }
    }
}