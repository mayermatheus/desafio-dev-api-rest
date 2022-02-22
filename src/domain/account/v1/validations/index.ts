import createAccount from './create-account.validation';
import patchAccount from './patch-account.validation';

export default {
  createAccountBody: createAccount.body,
  patchAccountBody: patchAccount.body,
  patchAccountParam: patchAccount.param,
};
