import createCustomer from './create-customer.validation';
import deleteCustomer from './delete-customer.validation';

export default {
  createCustomerBody: createCustomer.body,
  deleteCustomerParam: deleteCustomer.param,
};
