import { validateBody } from '../../middlewares/validation';
import accountController from './v1/controllers/account-controller';
import validation from './v1/validations';

export default [
  {
    method: 'post',
    path: '/v1/accounts',
    handlers: [
      validateBody(validation.createAccountBody),
      accountController.createAccount,
    ],
  },
];
