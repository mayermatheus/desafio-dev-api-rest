import { validateBody, validateParams } from '../../middlewares/validation';
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
  {
    method: 'patch',
    path: '/v1/accounts/:id',
    handlers: [
      validateParams(validation.patchAccountParam),
      validateBody(validation.patchAccountBody),
      accountController.patchAccount,
    ],
  },
  {
    method: 'post',
    path: '/v1/accounts/:id/credits',
    handlers: [
      validateParams(validation.createCreditAccountParam),
      validateBody(validation.createCreditAccountBody),
      accountController.creditOfAccount,
    ],
  },
];
