import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: [
            // {
            //     'id': 1,
            //     'title': 'Finish Vue',
            //     'completed': false,
            //     'editing': false,
            // },
            // {
            //     'id': 2,
            //     'title': 'Take over world',
            //     'completed': false,
            //     'editing': false,
            // },
            // {
            //     'id': 3,
            //     'title': 'Learn Vue.js',
            //     'completed': true,
            //     'editing': false,
            // },
            // {
            //     'id': 4,
            //     'title': 'Create Laravel API',
            //     'completed': false,
            //     'editing': false,
            // },
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
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false,
            })
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        updateFilter(state, filter) {
            state.filter = filter
        },
        checkAll(state, checked) {
            state.todos.forEach(
                (todo) => todo.completed = checked
            )
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex(item => item.id === id);
            state.todos.splice(index, 1)
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id);
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'completed': todo.completed,
                'editing': todo.editing
            });
        },
        retrieveTodos(state, todos) {
            state.todos = todos;
        }
    },
    actions: {
        retrieveTodos(context) {
            axios
                .get('/todos')
                .then(response => {
                    context.commit('retrieveTodos', response.data);
                })
                .catch(error => {console.log(error)})
        },
        addTodo(context, todo) {
            axios
                .post('/todos', {
                    title: todo.title,
                    completed: false,
                })
                .then(response => {
                    context.commit('addTodo', response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        clearCompleted(context) {
            const completed = store.state.todos
                .filter(todo => todo.completed)
                .map(todo => todo.id);

            axios
                .delete('/todosDeleteCompleted', {
                    data: { todos: completed }
                })
                .then(response => {
                    context.commit('clearCompleted')
                })
                .catch(error => {
                    console.log(error)
                })
        },
        checkAll(context, checked) {
            axios
                .patch('/todosCheckAll', {
                    completed: checked
                })
                .then(response => {
                    context.commit('checkAll', checked);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteTodo(context, id) {
            axios
                .delete('/todos/' + id)
                .then(response => {
                    context.commit('deleteTodo', id);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateTodo(context, todo) {
            axios
                .patch('/todos/' + todo.id, {
                    title: todo.title,
                    completed: todo.completed,
                })
                .then(response => {
                    context.commit('updateTodo', response.data);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter);
        }
    }
});