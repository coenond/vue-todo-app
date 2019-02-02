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
        computed: {
            allChecked() {
                return this.$store.getters.allChecked
            }
        },
        methods: {
            checkAllTodos() {
                this.$store.dispatch('checkAll', event.target.checked)
            }
        }
    }
</script>
