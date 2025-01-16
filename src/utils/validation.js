
export function validate(dataForm, fields) {
    fields.forEach(field => {
        validateField(field, dataForm.value.data[field.name])
    })
} 

const validateField = (field, data) => {
    Object.entries(field.validation || []).forEach(rule => {
        validateRule(field.name, rule, data)
    })
}

const validateRule = (fieldName, rule, data) => {
    console.log(fieldName, rule, data)
}