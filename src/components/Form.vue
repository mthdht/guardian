<template>
    <form class="space-y-4">
        <div class="" v-for="(field, index) in build.fields">
            <Field v-bind="field" v-model="data[field.name]"></Field>
            <p>

                {{ data[field.name] }}
            </p>
        </div>
    </form>
</template>

<script setup>
import Field from './Field.vue'

const props = defineProps({
    build: {
        type: Object,
        required: true,
        default: () => {},
    }
})


const data = defineModel()

props.build.fields.forEach(field => {
    data.value[field.name] = field.defaultValue
});
</script>