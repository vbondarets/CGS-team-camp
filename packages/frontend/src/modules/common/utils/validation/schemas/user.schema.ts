import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(50)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'me'] }
    })
    .messages({
      'email.base': 'Wrong parametr',
      'string.max': 'Email to long',
      'string.min': 'Email to short',
      'any.required': 'Email is a required field'
    })
    .required(),
  password: Joi.string()
    .min(3)
    .messages({
      'string.pattern.base': 'Wrong parametr',
      'string.base': 'Password should be a type of "string"',
      'string.max': 'Password to long',
      'string.min': 'Password to short',
      'any.required': 'Password is a required field',
      'any.only': "Passwords don't match"
    })
    .required(),
  passwordConf: Joi.string().min(3).valid(Joi.ref('password')).messages({
    'string.pattern.base': 'Wrong parametr',
    'string.base': 'Password should be a type of "string"',
    'string.max': 'Password to long',
    'string.min': 'Password to short',
    'any.required': 'Password is a required field',
    'any.only': "Passwords don't match"
  })
});

export default userSchema;
