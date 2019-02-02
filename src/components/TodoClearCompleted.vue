<template>
    <div>
        <transition name="fade">
            <button v-if="show"
                    @click="clearCompleted">
                Clear Completed
            </button>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'todo-clear-completed',
        computed: {
            show() {
                return this.$store.getters.showClearCompletedButton
            }
        },
        methods: {
            clearCompleted() {
                this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
            }
        }
    }
</script>
