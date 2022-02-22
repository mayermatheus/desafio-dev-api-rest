import createAccount from './create-account.validation';
import patchAccount from './patch-account.validation';
import createCreditAccount from './create-credit-account.validation';

export default {
  createAccountBody: createAccount.body,
  patchAccountBody: patchAccount.body,
  patchAccountParam: patchAccount.param,
  createCreditAccountBody: createCreditAccount.body,
  createCreditAccountParam: createCreditAccount.param,
};
