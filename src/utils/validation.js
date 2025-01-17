export function validate(data, fields) {
    console.log(data, fields)
    const errors = {}
    fields.forEach(field => {
        
        const value = data[field.name];
        const rules = field.validation || {};

        if (rules.required && !value) {
            errors[field.name] = `${field.label || field.name} is required`;
            console.log(errors)
            return errors; // Skip further checks if the field is required and empty
          }
    })
}