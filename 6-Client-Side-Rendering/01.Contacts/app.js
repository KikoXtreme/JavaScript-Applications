import { html, render } from "./node_modules/lit-html/lit-html.js";
import { contacts } from './contacts.js';


const contactsTemplate = (data) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button class="detailsBtn">Details</button>
        <div class="details" id="${data.id}">
            <p>Phone number: ${data.phoneNumber}</p>
            <p>Email: ${data.email}</p>
        </div>
    </div>
</div>`;

const container = document.querySelector('#contacts');
container.addEventListener('click', onDetails)

function showContacts() {
    render(contacts.map(contactsTemplate), container);
}

showContacts()

function onDetails(ev) {
    if (ev.target.tagName === 'BUTTON') {
        const detailsDiv = ev.target.parentElement.querySelector('.details');

        if (detailsDiv.style.display === 'block') {
            detailsDiv.style.display = 'none';
        } else {
            detailsDiv.style.display = 'block';
        }
    }
}