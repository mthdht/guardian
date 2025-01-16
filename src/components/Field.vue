<template>
    <div class="field flex gap-4 items-center">
        <label>{{ props.label }}</label>
        <input v-bind="props">
    </div>
</template>

<script setup>
const props = defineProps({
    type: String,
    label: String,
    placeholder: String,
    name: String
})
</script>