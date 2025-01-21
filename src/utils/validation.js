const predefinedPatterns = {
    alpha: /^[a-zA-Z]+$/,
    "alpha-dash": /^[a-zA-Z0-9-_]+$/,
    "alpha-num": /^[a-zA-Z0-9]+$/,
    email: /^\S+@\S+\.\S+$/,
    numeric: /^[0-9]+$/,
    url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
};

const predefinedMessages = {
    required: (label) => `${label} is required. ok`,
    minLength: (label, value) => `${label} must be at least ${value} characters. ok`,
    maxLength: (label, value) => `${label} must be at most ${value} characters.`,
    min: (label, value) => `${label} must be at least ${value}.`,
    max: (label, value) => `${label} must be at most ${value}.`,
    pattern: (label, pattern) => `${label} must follow the ${pattern} format. ok`,
}

const getErrorMessage = (label = '', rule = '', value = '') => {
    return predefinedMessages[rule](label, value);
}


export function validate(data, fields, messages) {
    const errors = {}
    fields.forEach(field => {
        const value = data[field.name];
        const rules = field.validation || {};
        errors[field.name] = {}

        if (rules.required && !value) {
            errors[field.name]['required'] = getErrorMessage(field.label || field.name, 'required')
        }

        // MinLength and MaxLength (for strings)
        if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
            errors[field.name]['minLength'] = getErrorMessage(field.label || field.name, 'minLength', rules.minLength);
        }
        if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
            errors[field.name]['maxLength'] = getErrorMessage(field.label || field.name, 'maxLength', rules.maxLength);
        }

        // Min and Max (for numbers)
        if (rules.min !== undefined && typeof value === "number" && value < rules.min) {
            errors[field.name]['min'] = getErrorMessage(field.label || field.name, 'min', rules.min);
        }
        if (rules.max !== undefined && typeof value === "number" && value > rules.max) {
            errors[field.name]['max'] = getErrorMessage(field.label || field.name, 'max', rules.max);
        }

        // Custom validation function
        if (rules.custom && typeof rules.custom === "function") {
            const customError = rules.custom(value);
            if (customError) {
                errors[field.name]['custom'] = customError;
            }
        }

        if (rules.pattern) {
            const regex = predefinedPatterns[rules.pattern] || new RegExp(rules.pattern);
            if (!regex.test(value)) {
                errors[field.name]['pattern-'+rules.pattern] = getErrorMessage(field.label || field.name, 'pattern', rules.pattern);
            }
        }

    })
    return errors
}