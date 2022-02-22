import Joi, { CustomHelpers } from '@hapi/joi';
import { cpf } from 'cpf-cnpj-validator';

const cpfValidate = (value: any, helpers: CustomHelpers) => {
  return !cpf.isValid(value) ? helpers.error('any.invalid') : value;
};

const createCustomerBody = {
  nationalRegistration: Joi.string().min(11).max(11).custom(cpfValidate).required(),
  name: Joi.string().required(),
};

export default {
  body: Joi.object(createCustomerBody),
};
