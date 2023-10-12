import Joi from 'joi';

const TodoSchema = Joi.object({
  id: Joi.string().messages({
    'string.pattern.base': 'Wrong parametr',
    'string.base': 'ID should be a type of "string"'
  }),
  title: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.pattern.base': 'Wrong parametr',
      'string.base': 'Title should be a type of "string"',
      'string.max': 'Title to long',
      'string.min': 'Title to short',
      'any.required': 'Title is a required field'
    })
    .required(),
  description: Joi.string()
    .min(3)
    .max(1500)
    .messages({
      'string.pattern.base': 'Wrong parametr',
      'string.base': 'Description should be a type of "string"',
      'string.max': 'Description to long',
      'string.min': 'Description to short',
      'any.required': 'Description is a required field'
    })
    .required(),
  active: Joi.boolean().messages({
    'boolean.pattern.base': 'Wrong parametr',
    'boolean.base': 'Should be a type of "boolean"'
  }),
  private: Joi.boolean().messages({
    'boolean.pattern.base': 'Wrong parametr',
    'boolean.base': 'Should be a type of "boolean"'
  })
});

export default TodoSchema;
