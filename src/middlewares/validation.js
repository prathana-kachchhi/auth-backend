const validate = (schema) => {
    return (req, res, next) => {
        const { value ,error } = schema.validate(req.body, {stripUnknown: true});
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        req.body = value;
        next();
    }
}

export default validate;
