let token = window.localStorage.getItem('token')
let username = window.localStorage.getItem('username')

if(!token && !username) window.location = '/login'
usernameText.textContent = username

let hour = new Date()
let hor = (''+hour.getHours()).padStart(2,0)
let min = (''+hour.getMinutes()).padStart(2,0)

const getTodos = async () => {
	let data = await request('/todos', 'GET', undefined, true)
	let res = await data.json()
	renderTodos(res.data)
}


form.onsubmit = async  (event) => {
	event.preventDefault()
	let newTodo = {
		todo_text: textInput.value,
		todo_time: hor + ':' + min
	}
	let res = await request('/todos', 'POST', newTodo, true)
	
	if(res.status == 200) {
		res = await res.json()
		let todo = res.data
		renderTodos([todo])
	}
}


function renderTodos(todos) 
{
	for(let todo of todos) {

		let userID = window.localStorage.getItem('userID')
		let li = document.createElement('li')
		let div = document.createElement('div')
		let text = document.createElement('span')
		let time = document.createElement('span')
		let username = document.createElement('span')
		
		
		if(todo.user_id == userID) {
			let button = document.createElement('button')
			username.setAttribute("class", "user-right")
			text.setAttribute("class", "massage-right")
			time.setAttribute("class", "time-right")
			li.classList.add('li-right')
			div.setAttribute('class','me')

			button.onclick = async () => {
				let res = await request('/todos', 'DELETE', { todo_id: todo.todo_id }, true)
				if(res.status == 200) {
					li.remove()
				}
				
			}

			textInput.value = ''
			li.append(button)
		}else{
			username.setAttribute("class", "user-left")
			text.setAttribute("class", "massage-left")
			time.setAttribute("class", "time-left")
		}

		time.contentEditable = true
		text.contentEditable = true
		
		text.textContent = todo.todo_text
		time.textContent = todo.todo_time
		username.textContent = todo.username
		

		div.append(text)
		div.append(time)
		li.append(username)
		li.append(div)
		

		ulList.append(li)

		

		text.onkeyup = async  (event) => {
			if(event.keyCode == 13) {
				let x = text.textContent
				let res = await request('/todos', 'PUT', { todo_id: todo.todo_id, todo_text: text.textContent }, true)
				text.textContent = x
			}

		}

	// 	time.onkeyup = async  (event) => {
	// 		if(event.keyCode == 13) {
	// 			let x = time.textContent
	// 			let res = await request('/todos', 'PUT', { todo_id: todo.todo_id, todo_time: time.textContent }, true)
	// 			time.textContent = x
	// 		}

	// 	}
	}
}

logout.onclick = () => {
	window.localStorage.removeItem('token')
	window.localStorage.removeItem('username')
	window.location = '/login'
}



getTodos()

  