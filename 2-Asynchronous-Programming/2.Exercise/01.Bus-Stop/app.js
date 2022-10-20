async function getInfo() {
    let stopID = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');
    let buses = document.getElementById('buses');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopID}`;

    try {
        stopName.textContent = 'Loading...';
        
        let res = await fetch(url);
        buses.innerHTML = '';
        
        if (res.status !== 200) {
            throw new Error('Error');
        }
        let data = await res.json();

        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(el => {
            let [busID, busTime] = el;
            let liEl = document.createElement('li');
            liEl.textContent = `Bus ${busID} arrives in ${busTime} minutes`;
            buses.appendChild(liEl);
        });

    } catch (error) {
        stopName.textContent = 'Error';
    }
}