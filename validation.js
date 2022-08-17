
//Validation
const Joi = require('@hapi/joi')

// Register Validation
const createUserDataValidation =(data)=>{

const schema=Joi.object({
   
    name:Joi
    .string()
    .required(),
    
    email:Joi
    .string()
    .required().
    email(),

    phone:Joi
    .number()
    .required()
})

return schema.validate(data)
}

const deleteUserDatavalidation =(data)=>{

    const schema=Joi.object({
       
        email:Joi.string()
        .required()
        .email(),
        
    })
    
    return schema.validate(data)
    }

module.exports.createUserDataValidation=createUserDataValidation
module.exports.deleteUserDatavalidation=deleteUserDatavalidation