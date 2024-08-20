import loginSchema from "../validators/userlogin.validator.js";



export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
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

export default validateLogin;