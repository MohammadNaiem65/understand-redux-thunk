const fetch = require('node-fetch');

const fetchTodosFromServer = async (dispatch) => {
	const res = await fetch(
		'https://jsonplaceholder.typicode.com/todos?_limit=5'
	);
	const todos = await res.json();

	dispatch({ type: 'todos/todoLoaded', payload: todos });
};

module.exports = { fetchTodosFromServer };
