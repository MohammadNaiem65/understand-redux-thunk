const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { fetchTodosFromServer } = require('./functions');

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
const store = createStore(todoReducer, applyMiddleware(thunk));

// subscribe to state changes
store.subscribe(() => console.log(store.getState()));

// ! Dispatch actions
store.dispatch(fetchTodosFromServer);
