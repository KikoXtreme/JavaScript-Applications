function loadRepos() {
	let username = document.getElementById('username').value;
	let ulRepos = document.getElementById('repos');

	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => {
			if (response.ok === false) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
			return response.json();
		})
		.then(handleResponse)
		.catch(errorHandle);

	function handleResponse(data) {
		ulRepos.innerHTML = '';

		for (let repo of data) {
			let liElement = document.createElement('li');
			liElement.innerHTML = `<a href="${repo.html_url}">${repo.full_name}</a>`
			ulRepos.appendChild(liElement);
		}
	}

	function errorHandle(error) {
		ulRepos.innerHTML = '';
		ulRepos.textContent = `${error.message}`;
	}
}