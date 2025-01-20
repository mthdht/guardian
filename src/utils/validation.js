export function validate(data, fields) {
    const errors = {}
    fields.forEach(field => {
        const value = data[field.name];
        const rules = field.validation || {};
        errors[field.name] = {}

        if (rules.required && !value) {
            errors[field.name]['required'] = `${field.label || field.name} is required`;
        }

        // MinLength and MaxLength (for strings)
        if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
            errors[field.name]['minLength'] = `${field.label || field.name} must be at least ${rules.minLength} characters long.`;
        }
        if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
            errors[field.name]['maxLength'] = `${field.label || field.name} must be at most ${rules.maxLength} characters long.`;
        }

        // Min and Max (for numbers)
        if (rules.min !== undefined && typeof value === "number" && value < rules.min) {
            errors[field.name]['min'] = `${field.label || field.name} must be at least ${rules.min}.`;
        }
        if (rules.max !== undefined && typeof value === "number" && value > rules.max) {
            errors[field.name]['max'] = `${field.label || field.name} must be at most ${rules.max}.`;
        }

    })
    return errors
}