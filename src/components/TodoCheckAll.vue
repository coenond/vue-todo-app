<template>
    <div>
        <label>
            <input type="checkbox"
                   :checked="allChecked"
                   @change="checkAllTodos"
            />
            Check All
        </label>
    </div>
</template>

<script>
    export default {
        name: 'todo-check-all',
        props: {
            allChecked: {
                type: Boolean,
                required: true,
            }
        },
        methods: {
            checkAllTodos() {
                eventBus.$emit('checkAllChanged', this.allChecked)
            }
        }
    }
</script>
