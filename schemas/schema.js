const Joi = require('joi')

const userSchema = (input) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        isGold: Joi.boolean().default(false),
        phoneNumber: Joi.string().required()
    })
    return schema.validate(input)
    
}

module.exports = userSchema