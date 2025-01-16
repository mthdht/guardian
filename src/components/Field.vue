<template>
    <div class="field flex gap-4 items-center" v-if="props.type == 'select'">
        <label>{{ props.label }}</label>
        <select :name="props.name" v-model="model">
            <option :value="option.value" v-for="option in props.options">{{ option.label }}</option>
        </select>
    </div>

    <div class="field flex gap-4 items-center" v-else>
        <label>{{ props.label }}</label>
        <div class="">
            <input :type="props.type" :name="props.name" :placeholder="props.placeholder" v-model="model">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const model = defineModel()

const props = defineProps({
    type: String,
    label: String,
    placeholder: String,
    name: String,
    options: Array,
    validation: Object,
    defaultValue: String
})
</script>