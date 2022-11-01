function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onSubmit)
    phonebook.addEventListener('click', deleteContact);

    loadContacts();
}

const phonebook = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

attachEvents();

async function onSubmit() {
    const person = personInput.value;
    const phone = phoneInput.value;
    const contact = { person, phone }

    const result = await createContacts(contact);

    personInput.value = '';
    phoneInput.value = '';

    phonebook.appendChild(createItem(result));
}

async function deleteContact(event) {
    const id = event.target.dataset.id;
    if (id !== undefined) {
        await onDelete(id);
        event.target.parentElement.remove();
    }
}

async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const res = await fetch(url);
    const data = await res.json();

    phonebook.replaceChildren(...Object.values(data).map(createItem));
}

function createItem(c) {
    let liEl = document.createElement('li');
    liEl.innerHTML = `${c.person}: ${c.phone} <button data-id="${c._id}">Delete</button>`;
    return liEl;
}

async function createContacts(obj) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }

    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}

async function onDelete(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;

    const res = await fetch(url, {
        method: 'delete'
    });
    const result = await res.json();

    return result;
}