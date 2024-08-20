import userRegistrationSchema from '../validators/uservalidator.js'



// Middleware to validate the request body using Joi schema
const validateUserRegistration = (req, res, next) => {
    const { error } = userRegistrationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: error.details.map((err) => ({
                message: err.message,
                path: err.path[0],
            })),
        });
    }
    next();
};


export default validateUserRegistration;