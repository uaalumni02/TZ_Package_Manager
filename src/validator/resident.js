const Joi = require('@hapi/joi');


const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().trim().email().required(),
    phone: Joi.string().regex(/^(\(\d{3}\) |\d{3}-)\d{3}-\d{4}$/).default('111-222-3333').required(),
    isDeleted: Joi.boolean(),
})

export default schema