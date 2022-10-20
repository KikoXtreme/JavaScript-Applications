async function lockedProfile() {
    let url = `http://localhost:3030/jsonstore/advanced/profiles`;
    let main = document.getElementById(`main`);
    main.innerHTML = ``;

    let res = await fetch(url);
    let data = await res.json();

    let count = 0;

    Object.entries(data).forEach((el) => {
        count++;

        let profile = document.createElement(`div`);
        profile.classList.add(`profile`);

        profile.innerHTML = `<img src="./iconProfile2.png" class="userIcon">
          <label>Lock</label>
          <input type="radio" name="user${count}Locked" value="lock" checked="">
          <label>Unlock</label><input type="radio" name="user${count}Locked" value="unlock">
          <br>
          <hr>
          <label>Username</label>
          <input type="text" name="user${count}Username" value="${el[1][`username`]
            }" disabled="" readonly="">
          <div class="hiddenInfo">
                      <hr>
                      <label>Email:</label>
                      <input type="email" name="user${count}Email" value="${el[1][`email`]
            }" disabled="" readonly="">
                      <label>Age:</label>
                      <input type="email" name="user${count}Age" value="${el[1][`age`]
            }" disabled="" readonly="">
          </div>
          <button>Show more</button>`;

        let showBtn = profile.querySelector(`button`);

        showBtn.addEventListener(`click`, (ev) => {
            let profile = ev.target.parentNode;
            let isLocked = profile.children[2].checked;

            if (!isLocked) {
                if (ev.target.textContent == `Hide it`) {
                    profile.children[9].classList.add(`hiddenInfo`);
                    ev.target.textContent = `Show more`;
                } else {
                    profile.children[9].classList.remove(`hiddenInfo`);
                    ev.target.textContent = `Hide it`;
                }
            }
        });

        main.appendChild(profile);
    });
}