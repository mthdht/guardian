<template>
  <div class="p-8">

    <Form :build="build" v-model="dataForm" @submit-form="handleForm">
      <button>Ok</button>
    </Form>

    {{ dataForm }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Form from './components/Form.vue'

const build = {
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      defaultValue: '',
      validation: {
        required: true,
        minLength: 3,
        max: 20,
        pattern: "email",
        custom: (value) => {
          return 'custom works!'
        }
      }
    },/*
    {
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "placeholder": "example@email.com",
      "defaultValue": "",
      "validation": {
        "required": true,
        "pattern": "^\\S+@\\S+\\.\\S+$"
      }
    },
    {
      "name": "age",
      "label": "Age",
      "type": "number",
      "placeholder": "Enter your age",
      "defaultValue": 18,
      "validation": {
        "required": false,
        "min": 0,
        "max": 120
      }
    },
    {
      "name": "gender",
      "label": "Gender",
      "type": "select",
      "options": [
        { "label": "Male", "value": "male" },
        { "label": "Female", "value": "female" },
        { "label": "Other", "value": "other" }
      ],
      "defaultValue": null,
      "validation": {
        "required": true
      }
    },
    {
      "name": "newsletter",
      "label": "Subscribe to newsletter",
      "type": "checkbox",
      "defaultValue": false
    },
    {
      name: "color",
      label: "color",
      type: "color",
      placeholder: "Enter your username",
      defaultValue: "",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: "email",
      }
    },*/
    
  ],
  
  "layout": "vertical",
  "submitButton": {
    "label": "Submit",
    "style": "primary"
  }
}

const dataForm = ref({data: {}, errors: {}})

const handleForm = ({data, errors}) => {
  console.log(data, errors)
}

</script>



<style scoped>

</style>
