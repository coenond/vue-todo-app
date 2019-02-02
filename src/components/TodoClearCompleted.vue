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
        props: {
            show: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            clearCompleted() {
                eventBus.$emit('clearCompletedTodos')
            }
        }
    }
</script>
