import Joi from '@hapi/joi';

const getParam = {
  id: Joi.string().required(),
};

export default {
  param: Joi.object(getParam),
};
