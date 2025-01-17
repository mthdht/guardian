<template>
    <form class="space-y-4" @submit.prevent="submit">
        <div class="" v-for="(field, index) in build.fields">
            <Field v-bind="field" v-model="dataForm.data[field.name]"></Field>
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


const dataForm = defineModel()

props.build.fields.forEach(field => {
    dataForm.value.data[field.name] = field.defaultValue || ''
    dataForm.value.errors[field.name] = ''
});
console.log(dataForm.value)

const submit = () => {
    console.log(dataForm.value)
    dataForm.value.errors = validate(dataForm.value.data, props.build.fields)
    console.log(dataForm.value.errors)
}

</script>