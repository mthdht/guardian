<template>
    <div class="field flex gap-4" v-if="props.type == 'select'">
        <label>{{ props.label }}</label>
        <select :name="props.name" v-model="model">
            <option :value="option.value" v-for="option in props.options">{{ option.label }}</option>
        </select>
        <p>{{ Object.values(props.errors || {})[0] }}</p>
    </div>
    
    <div class="field flex gap-4" v-else>
        <label>{{ props.label }}</label>
        <div :class="errorPosition" class="relative">
            <input :type="props.type" :name="props.name" :placeholder="props.placeholder" v-model="model" class="border">
            <p v-show="props.errors" class="text-sm text-red-600">* {{ Object.values(props.errors || {})[0] }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue'

const model = defineModel()

const props = defineProps({
    type: String,
    label: String,
    placeholder: String,
    name: String,
    options: Array,
    validation: Object,
    defaultValue: [String,Number],
    errors: Object,
    errorsDidplay: Object
})

const options = inject('options')

const errorPosition = computed(() => {
    return options.errorsDisplay.position == 'side' ? 'flex gap-2 items-center': ''
})
</script>