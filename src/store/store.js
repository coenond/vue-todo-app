import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: [
            {
                'id': 1,
                'title': 'Finish Vue',
                'completed': false,
                'editing': false,
            },
            {
                'id': 2,
                'title': 'Take over world',
                'completed': false,
                'editing': false,
            },
            {
                'id': 3,
                'title': 'Learn Vue.js',
                'completed': true,
                'editing': false,
            },
            {
                'id': 4,
                'title': 'Create Laravel API',
                'completed': false,
                'editing': false,
            },
        ]
    },
    getters: {
        remaining(state) {
                return state.todos.filter(todo => !todo.completed).length
            },
            allChecked(state, getters) {
                return getters.remaining === 0
            },
            todosFiltered(state) {
                switch (state.filter) {
                    case 'active':
                        return state.todos.filter(todo => !todo.completed)
                    case 'completed':
                        return state.todos.filter(todo => todo.completed)
                    default:
                        return state.todos
                }
            },
            showClearCompletedButton(state) {
                return state.todos.filter(todo => todo.completed).length > 0
            }
    }
})