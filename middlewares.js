const fetch = require('node-fetch');

const delayAction = (store) => (next) => (action) => {
	if (action.type === 'todos/todoAdded') {
		console.log('Action was dispatched but delaying');

		setTimeout(() => {
			next(action);
		}, 2000);

		return;
	}

	return next(action);
};

const fetchTodos = (store) => (next) => async (action) => {
	if (action.type === 'todos/fetchTodos') {
		const res = await fetch(
			'https://jsonplaceholder.typicode.com/todos?_limit=5'
		);
		const todos = await res.json();

		store.dispatch({ type: 'todos/todoLoaded', payload: todos });

		return;
	}

	return next(action);
};

module.exports = {
	delayAction,
	fetchTodos,
};
