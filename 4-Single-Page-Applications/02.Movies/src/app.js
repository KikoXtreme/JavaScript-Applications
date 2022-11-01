import { showHome } from './home.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';
// import { showDetails } from './details.js';
// import { showEdit } from './edit.js';

const views = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
}

const nav = document.querySelector('nav');

document.getElementById('logoutBtn').addEventListener('click', onLogout);
nav.addEventListener('click', (event) => {
    const view = views[event.target.id];
    if (typeof view === 'function') {
        event.preventDefault();
        view();
    }
});

updateNav();
showHome();

export function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null) {
        nav.querySelector('#welcomeMessage').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.nav-item.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.nav-item.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.nav-item.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.nav-item.guest')].forEach(e => e.style.display = 'block');
    }
}

async function onLogout(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const { token } = JSON.parse(sessionStorage.getItem('userData'));
    const url = 'http://localhost:3030/users/logout';

    await fetch(url, {
        headers: {
            'X-Authorization': token
        }
    });

    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();
}