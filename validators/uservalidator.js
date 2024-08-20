import Joi from 'joi';

// Define the Joi schema for user registration
const userRegistrationSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        'string.base': 'Username should be a type of text',
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email is required',
        'string.email': 'Please enter a valid email address',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of text',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
    blogs: Joi.array().items(Joi.string().optional()).optional().messages({
        'array.base': 'Blogs should be an array',
    }),
});

export default userRegistrationSchema;

