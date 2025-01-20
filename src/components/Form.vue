<template>
    <form class="space-y-4" @submit.prevent="submit">
        <div class="" v-for="(field, index) in build.fields">
            <Field v-bind="{...field, errors: model.errors[field.name]}" v-model="model.data[field.name]"></Field>
        </div>

        <slot v-if="$slots.default"></slot>

        <input v-else type="submit" :value="props.build.submitButton.label || 'Submit'">
    </form>
</template>

<script setup>
import Field from './Field.vue'
import { validate } from '../utils/validation.js'

const props = defineProps({
    build: {
        type: Object,
        required: true,
        default: () => {},
    },
    noValidation: {
        type:Boolean,
        default: false
    }
})

const emit = defineEmits(['submitForm'])
const model = defineModel({default: {data: {}, errors: {}}})

props.build.fields.forEach(field => {
    model.value.data[field.name] = field.defaultValue || ''
})

const submit = () => {
    if (!props.noValidation) {
        model.value.errors = validate(model.value.data, props.build.fields)
    }
    emit('submitForm', {data: model.value.data, errors: model.value.errors})
}

</script>