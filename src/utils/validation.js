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
    pattern: (label, pattern) => {
        if (pattern instanceof RegExp) {
            return `${label} does not follow the ${label} format. ok`
        }
        return `${label} must follow the ${pattern} format. ok`
    }
}

export function validate(data, fields, messages) {
    console.log(messages)

    const errors = {}
    fields.forEach(field => {
        const value = data[field.name];
        const rules = field.validation || {};
        errors[field.name] = {}

        if (rules.required && !value) {
            errors[field.name]['required'] = messages.required || predefinedMessages['required'](field.label || field.name);
        }

        // MinLength and MaxLength (for strings)
        if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
            errors[field.name]['minLength'] =  messages.minLength || predefinedMessages['minLength'](field.label || field.name, rules.minLength);
        }
        if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
            errors[field.name]['maxLength'] =  messages.maxLength || predefinedMessages['maxLength'](field.label || field.name, rules.maxLength);
        }

        // Min and Max (for numbers)
        if (rules.min !== undefined && typeof value === "number" && value < rules.min) {
            errors[field.name]['min'] =  messages.min || predefinedMessages['min'](field.label || field.name, rules.min);
        }
        if (rules.max !== undefined && typeof value === "number" && value > rules.max) {
            errors[field.name]['max'] =  messages.max || predefinedMessages['max'](field.label || field.name, rules.max);
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
            const patternName = regex instanceof RegExp ? 'regex' : rules.pattern;
            if (!regex.test(value)) {
                errors[field.name]['pattern-'+ patternName] =  messages.pattern?.[rules.pattern] || predefinedMessages['pattern'](field.label || field.name, rules.pattern);
            }
        }

    })
    return errors
}