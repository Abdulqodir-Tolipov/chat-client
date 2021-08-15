form.onsubmit = async event => {
	event.preventDefault()
	let user = {
		username: usernameInput.value,
		password: passwordInput.value,
	}

	let response = await request('/login', 'POST', user)

	if(response.status == 200) {
		response = await response.json()
		window.localStorage.setItem('token', response.token)
		window.localStorage.setItem('userID', response.userID)
		window.localStorage.setItem('username', usernameInput.value)
		message.textContent = response.message
		message.style.color = 'green'
		setTimeout( () => {
			window.location.href = '/'
		}, 2000)
	} else {
		response = await response.json()
		message.textContent = response.message
		message.style.color = 'red'
	}
}