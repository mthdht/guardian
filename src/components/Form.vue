<template>
    <form class="space-y-4" @submit.prevent="submit">
        <div class="" v-for="(field, index) in build.fields">
            <Field v-bind="field" v-model="model.data[field.name]"></Field>
        </div>

        <input type="submit" value="Submit">
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
    }
})


const model = defineModel({default: {data: {}, errors: {}}})

props.build.fields.forEach(field => {
    model.value.data[field.name] = field.defaultValue || ''
    model.value.errors[field.name] = ''
    console.log(model.value)
})

const submit = () => {
    console.log(validate(model.value.data, props.build.fields))
    model.value.errors = validate(model.value.data, props.build.fields)
    console.log(model.value)
}

</script>