export function validate(data, fields) {
    const errors = {}
    fields.forEach(field => {
        const value = data[field.name];
        const rules = field.validation || {};
        errors[field.name] = {}

        if (rules.required && !value) {
            errors[field.name]['required'] = `${field.label || field.name} is required`;
          }
    })
    return errors
}