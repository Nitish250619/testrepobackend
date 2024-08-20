import Joi from 'joi';

// Define the Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
});

export default loginSchema;