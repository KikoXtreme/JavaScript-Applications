window.addEventListener('load', solution);

async function solution() {
    let url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    let res = await fetch(url);
    let data = await res.json();

    data.forEach(el => {
        let id = el._id;
        createArticle(id);
    });

    button();
}

async function createArticle(id) {
    let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

    let res = await fetch(url);
    let data = await res.json();

    let main = document.getElementById('main');

    main.innerHTML = main.innerHTML +
        `   <div class="accordion">
            <div class="head">
                <span>${data.title}</span>
                <button class="button" id="${data._id}">More</button>
            </div>
            <div class="extra">
                <p>${data.content}</p>
            </div>
        </div>`
}

function button() {
    document.getElementById('main').addEventListener("click", onClick);

    function onClick(ev) {
        let btn = ev.target;
        if (btn.tagName !== "BUTTON") {
            return;
          }

        let div = btn.parentNode.parentNode.querySelector('.extra');
        div.style.display = div.style.display == 'inline' ? 'none' : 'inline';

        if (btn.textContent === 'More') {
            btn.textContent = 'Less';
        } else {
            btn.textContent = 'More';
        }
    }
}