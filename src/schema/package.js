const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const schema = Joi.object({
    deliveryDate: Joi.number().required(),
    deliveryTime: Joi.string().required(),
    additionalInfo: Joi.string()
        .min(2)
        .max(25)
        .required(),
    name: Joi.objectId(),
    companyName: Joi.objectId()
})


export default schema