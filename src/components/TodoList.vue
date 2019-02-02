<template>
	<div>
		<input type="text"
               class="todo-input"
               placeholder="Whats needs to be done"
               v-model="newTodo"
               @keyup.enter="addTodo">

        <transition-group name="fade"
                          enter-active-class="animated fadeInUp"
                          leave-active-class="animated fadeOutDown">
            <todo-item v-for="(todo, index) in todosFiltered"
                       :key="todo.id"
                       :todo="todo"
                       :index="index"
                       :checkAll="allChecked"
            />
        </transition-group>

        <div class="extra-container">
            <todo-check-all :allChecked="allChecked" />
            <todo-items-remaining :remaining="remaining"/>
        </div>

        <div class="extra-container">
            <todo-filtered />
            <todo-clear-completed :show="showClearCompletedButton" />
        </div>
	</div>
</template>

<script>
    import TodoItem from './TodoItem'
    import TodoItemsRemaining from './TodoItemsRemaining'
    import TodoCheckAll from './TodoCheckAll'
    import TodoFiltered from './TodoFiltered'
    import TodoClearCompleted from './TodoClearCompleted'

    export default {
        name: 'todo-list',
        components: {
            TodoItem,
            TodoItemsRemaining,
            TodoCheckAll,
            TodoFiltered,
            TodoClearCompleted
        },
        data () {
            return {
                newTodo: '',
                idForTodo: 5,
                beforeEditCache: '',
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
            }
        },
        created() {
            eventBus.$on('removedTodo', (index) => this.removeTodo(index))
            eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
            eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked))
            eventBus.$on('filterChanged', (filter) => this.filter = filter)
            eventBus.$on('clearCompletedTodos', () => this.clearCompleted())
        },
        beforeDestroy() {
            eventBus.$off('removedTodo', (index) => this.removeTodo(index))
            eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
            eventBus.$off('checkAllChanged', (checked) => this.checkAllTodos(checked))
            eventBus.$off('filterChanged', (filter) => this.filter = filter)
            eventBus.$off('clearCompletedTodos', () => this.clearCompleted())
        },
        computed: {
            remaining() {
                return this.todos.filter(todo => !todo.completed).length
            },
            allChecked() {
                return this.remaining === 0
            },
            todosFiltered() {
                switch (this.filter) {
                    case 'active':
                        return this.todos.filter(todo => !todo.completed)
                    case 'completed':
                        return this.todos.filter(todo => todo.completed)
                    default:
                        return this.todos
                }
            },
            showClearCompletedButton() {
                return this.todos.filter(todo => todo.completed).length > 0
            }
        },
        methods: {
            addTodo() {
                if (this.newTodo.trim().length == 0) {
                    return
                }

                this.todos.push({
                    id: this.idForTodo,
                    title: this.newTodo,
                    completed: false,
                })

                this.newTodo = ''
                this.idForTodo++
            },
            removeTodo(index) {
                this.todos.splice(index, 1);
            },
            checkAllTodos() {
                this.todos.forEach(
                    (todo) => todo.completed = event.target.checked
                )
            },
            clearCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            },
            finishedEdit(data) {
                this.todos.splice(data.index, 1, data.todo)
            }
        }
    }
</script>

<style lang="scss">

	.todo-input {
		width: 100%;
		padding: 10px 18px;
		font-size: 18px;
		margin-bottom: 16px;

		&:focus {
			outline: 0;
		}
	}

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s;
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;

        &:hover {
            color: black;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }

    .completed {
        text-decoration: line-through;
        color: grey;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearace: none;

        &:hover {
            background: lightgreen;
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        background: lightgreen;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
