const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = Joi.object({
  deliveryDate: Joi.number().required(),
  additionalInfo: Joi.string()
    .min(2)
    .max(25)
    .required(),
  isDelivered: Joi.boolean(),
  name: Joi.objectId(),
  companyName: Joi.objectId()
});

export default schema;
