const Joi = require('@hapi/joi');

const schema = Joi.object({
    companyName: Joi.string()
        .min(3)
        .max(15)
        .required(),
})

export default schema