console.log('test')

const getUser = function() {
	fetch('/list_user')
	.then(response => response.json())
	.then(data => {
		var nHTML = '';
		console.log(data)
		data.forEach(function(item) {
			nHTML += '<li>' + item.firstname + ' ' + item.middlename + ' ' + item.lastname + 
			' <button class="btn" onClick=editUser("' + item.id + '")>Edit</button>' + 
			' <button class="btn btn-danger" onClick=deleteUser("' + item.id + '")>Delete</button>' + '</li>';
		});
		document.getElementById("user-list").innerHTML = '<ul>' + nHTML + '</ul>'
	})
	.catch(err => console.log(err))
}

function editUser(id) {
	console.log("edit", id)
	fetch('/get_user?id=' + id)
	.then(response => response.json())
	.then(data => {
		console.log(data)
		document.getElementById("firstname").value = data[0].firstname;
		document.getElementById("middlename").value = data[0].middlename;
		document.getElementById("lastname").value = data[0].lastname;
		document.getElementById("id").value = data[0].id;
	})
	.catch(err => console.log(err))
}

function deleteUser(id) {
	console.log("delete", id)
	fetch('/del_user', {
		method: "DELETE", 
		body: JSON.stringify({id: id}),
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	})
	.then(response => response.json())
	.then(data => {
		console.log(data)
		getUser()
	})
	.catch(err => console.log(err))
}

getUser()

document.getElementById("add-user").onclick = function(wew) {
	console.log(wew)
	console.log('clicked')
	const data = {
		firstname: document.getElementById('firstname').value,
		middlename: document.getElementById('middlename').value,
		lastname: document.getElementById('lastname').value
	}
	fetch("/", {
		method: "POST", 
		body: JSON.stringify(data),
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	}).then(res => {
		console.log("Request complete! response:", res);
		getUser()
	});
};

document.getElementById("update-user").onclick = function() {
	const data = {
		firstname: document.getElementById('firstname').value,
		middlename: document.getElementById('middlename').value,
		lastname: document.getElementById('lastname').value,
		id: document.getElementById('id').value
	}
	fetch("/update_user", {
		method: "PUT", 
		body: JSON.stringify(data),
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	}).then(res => {
		console.log("Request complete! response:", res);
		getUser()
	});
};