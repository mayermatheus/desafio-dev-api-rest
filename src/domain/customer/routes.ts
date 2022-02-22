import { validateBody, validateParams } from '../../middlewares/validation';
import customerController from './v1/controllers/customer-controller';
import validation from './v1/validations';

export default [
  {
    method: 'post',
    path: '/v1/customers',
    handlers: [
      validateBody(validation.createCustomerBody),
      customerController.createCustomer,
    ],
  },
  {
    method: 'delete',
    path: '/v1/customers/:id',
    handlers: [
      validateParams(validation.deleteCustomerParam),
      customerController.deleteCustomer,
    ],
  },
];
