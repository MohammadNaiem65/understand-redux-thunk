const fetch = require('node-fetch');

const delayActionMiddleware = (store) => (next) => (action) => {
	if (action.type === 'todos/todoAdded') {
		console.log('Action was dispatched but delaying');

		setTimeout(() => {
			next(action);
		}, 2000);

		return;
	}

	return next(action);
};

const fetchAPIMiddleware = (store) => (next) => (action) => {
	if (typeof action === 'function') {
		return action(store.dispatch);
	}

	return next(action);
};

module.exports = {
	delayActionMiddleware,
	fetchAPIMiddleware,
};
