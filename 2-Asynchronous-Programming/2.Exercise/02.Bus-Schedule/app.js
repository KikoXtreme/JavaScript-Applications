function solve() {
    let infoTable = document.querySelector('#info span');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    let data = {
        next: 'depot'
    };

    async function depart() {
        departBtn.disabled = true;
        infoTable.textContent = `Loading...`;

        let url = `http://localhost:3030/jsonstore/bus/schedule/${data.next}`;

        let res = await fetch(url);
        data = await res.json();

        infoTable.textContent = `Next stop ${data.name}`;

        arriveBtn.disabled = false;
    }

    function arrive() {
        infoTable.textContent = `Arriving at ${data.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();