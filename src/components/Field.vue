<template>
    <div class="field flex gap-4 items-center" v-if="props.type == 'select'">
        <label>{{ props.label }}</label>
        <select v-bind="props">
            <option value="option.value" v-for="option in props.options">{{ option.label }}</option>
        </select>
    </div>
    <div class="field flex gap-4 items-center" v-else>
        <label>{{ props.label }}</label>
        <input v-bind="props">
    </div>
</template>

<script setup>
const props = defineProps({
    type: String,
    label: String,
    placeholder: String,
    name: String,
    options: Array
})
</script>