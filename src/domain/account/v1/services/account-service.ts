import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import HttpError from '@errors/http-error';
import DefaultError from '@errors/default-error';
import { ServerCodeErrorEnum } from '@enums/server-code-error-enum';
import { CreateAccountBody } from '../interfaces/create-account-body';
import Account from '../entities/account';
import Config from '@config/app-config';
import { AccountResponse } from '../interfaces/account-response';
import CustomerService from '@domain/customer/v1/services/customer-service';
import CustomerNotFoundError from '@domain/customer/v1/errors/customer-not-found-error';
import { PatchAccountBody } from '../interfaces/patch-account-body';
import AccountNotFoundError from '../errors/account-not-found-error';
import { CreateCreditAccountBody } from '../interfaces/create-credit-account-body';
import TransactionService from '@domain/transaction/v1/services/transaction-service';
import { CreateTransactionCreditResponse } from '@domain/transaction/v1/interfaces/create-transaction-credit-response';
import AccountBlockedError from '../errors/account-blocked-error';
import AccountWithoutValueError from '../errors/account-without-value-error';
import AccountWithoutLimitDay from '../errors/account-without-limit-day';

class AccountService {
  public async createAccount(createAccountBody: CreateAccountBody): Promise<AccountResponse> {
    try {
      const accountRepository = getRepository(Account);

      const customer = await (new CustomerService()).getCustomerByNationalRegistration(createAccountBody.nationalRegistration);

      if (!customer) {
        throw new CustomerNotFoundError();
      }

      // validar se já existe uma conta ativa pra esse cara

      const account = await accountRepository.save({
        id: uuidv4().toString(),
        agency: Config.BANK_INFO.agencyNumber,
        value: 0,
        status: 'UNLOCKED',
        dailyWithDrawalLimit: Config.BANK_INFO.defaultLimitPerDaily,
        customer,
      });

      return {
        id: account.id,
        agency: account.agency,
        dailyWithDrawalLimit: account.dailyWithDrawalLimit,
        isActive: account.isActive,
        customer: { id: account.customer.id, nationalRegistration: account.customer.nationalRegistration, name: account.customer.name },
        number: account.number,
        status: account.status,
        value: account.value
      };
    } catch (error) {
      if (error instanceof DefaultError) {
        throw error;
      }

      throw new HttpError(500, ServerCodeErrorEnum.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR', null, error);
    }
  }

  public async patchAccount(id: string, patchAccountBody: PatchAccountBody): Promise<void> {
    try {
      const accountRepository = getRepository(Account);
      await this.getAccountById(id);

      await accountRepository.update(id, {
        status: patchAccountBody.status,
      });

    } catch (error) {
      if (error instanceof DefaultError) {
        throw error;
      }

      throw new HttpError(500, ServerCodeErrorEnum.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR', null, error);
    }
  }

  private async getAccountById(id: string): Promise<Account> {
    const accountRepository = getRepository(Account);
    const accountFound = await accountRepository
        .createQueryBuilder('account')
        .leftJoinAndSelect('account.transactions', 'transaction')
        .where({ id, isActive: true })
        .getOne();

    if (!accountFound) {
      throw new AccountNotFoundError();
    }

    return accountFound;
  }

  public async creditOfAccount(id: string, createCreditAccount: CreateCreditAccountBody): Promise<CreateTransactionCreditResponse> {
    try {
      const accountRepository = getRepository(Account);
      const accountFound = await this.getAccountById(id);

      if (accountFound.status === 'BLOCKED') {
        throw new AccountBlockedError();
      }

      const transactionsValueOfTypeCreditInToday = accountFound.getTransactionsOfCreditInToday();

      if (createCreditAccount.value > (Number(accountFound.dailyWithDrawalLimit) - transactionsValueOfTypeCreditInToday)) {
        throw new AccountWithoutValueError();
      }

      if (createCreditAccount.value > accountFound.value) {
        throw new AccountWithoutLimitDay();
      }

      await accountRepository.update(id, {
        value: accountFound.value - createCreditAccount.value,
      });

      return await (new TransactionService).createTransactionOfCreditInAccount(
        createCreditAccount.value, accountFound
      );
    } catch (error) {
      if (error instanceof DefaultError) {
        throw error;
      }

      throw new HttpError(500, ServerCodeErrorEnum.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR', null, error);
    }
  }
}

export default AccountService;
