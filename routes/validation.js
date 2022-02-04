//VALIDATION
const Joi = require('joi');

//Register Validation
const registerValidation = (data) => {
    
    const schema = 
        Joi.object().keys({
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).email().required(),
            password: Joi.string().min(6).max(1024).required()
        });
        
        return schema.validate(data);
};

const loginValidation = (data) => {
    
    const schema = 
        Joi.object().keys({
            email: Joi.string().min(6).max(255).email().required(),
            password: Joi.string().min(6).max(1024).required()
        });
        return schema.validate(data);
};

const productValidation = (data) => {
    const schema = 
        Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            stock: Joi.number().required()
        });
        return schema.validate(data);
};




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;
