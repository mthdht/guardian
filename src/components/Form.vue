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
import { inject } from 'vue'
import Field from './Field.vue'
import { validate } from '../utils/validation.js'
import { merge } from 'lodash-es'

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
const options = inject('options')
const emit = defineEmits(['submitForm'])
const model = defineModel({default: {data: {}, errors: {}}})

props.build.fields.forEach(field => {
    model.value.data[field.name] = field.defaultValue || ''
})

const submit = () => {
    if (!props.noValidation) { 

        const messages = merge({}, options.messages, props.build.messages)
        model.value.errors = validate(model.value.data, props.build.fields, messages)
    }
    emit('submitForm', {data: model.value.data, errors: model.value.errors})
}

</script>