const { createStore, applyMiddleware } = require('redux');
const { delayAction, fetchTodos } = require('./middlewares');

// initial state
const initialState = {
	todos: [],
};

// ! Todo reducer
const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'todos/todoAdded':
			return {
				...state,
				todos: [
					...state.todos,
					{
						title: action.payload,
					},
				],
			};

		case 'todos/todoLoaded':
			return {
				...state,
				todos: [...state.todos, ...action.payload],
			};

		default:
			return state;
	}
};

// store
const store = createStore(
	todoReducer,
	applyMiddleware(delayAction, fetchTodos)
);

// subscribe to state changes
store.subscribe(() => console.log(store.getState()));

// ! Dispatch actions
// store.dispatch({
// 	type: 'todos/todoAdded',
// 	payload: 'An action dispatched',
// });

store.dispatch({
	type: 'todos/fetchTodos',
});
