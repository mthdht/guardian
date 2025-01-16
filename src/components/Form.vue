<template>
    <form class="space-y-4">
        <div class="" v-for="(field, index) in build.fields">
            <Field v-bind="field"></Field>
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
</script>