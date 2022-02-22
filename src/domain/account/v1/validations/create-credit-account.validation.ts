import Joi from '@hapi/joi';

const createCreditAccountBody = {
  value: Joi.number().min(0).required(),
};

const getParam = {
    id: Joi.string().required(),
};
export default {
  body: Joi.object(createCreditAccountBody),
  param: Joi.object(getParam),
};
