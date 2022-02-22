import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import HttpError from '@errors/http-error';
import { ServerCodeErrorEnum } from '@enums/server-code-error-enum';
import Transaction from '../entities/transaction';
import { TypeTransactionEnum } from '../enums/type-transaction-enum';
import Account from '@domain/account/v1/entities/account';
import { CreateTransactionCreditResponse } from '../interfaces/create-transaction-credit-response';

class TransactionService {
  public async createTransactionOfCreditInAccount(value: number, account: Account): Promise<CreateTransactionCreditResponse> {
    try {
      const transactionRepository = getRepository(Transaction);
  
      const transaction = await transactionRepository.save({
        id: uuidv4().toString(),
        account: account,
        date: new Date(),
        type: TypeTransactionEnum.CREDIT,
        value: value,
      });

      return {
        id: transaction.id,
        account,
        type: transaction.type,
        value: transaction.value,
      }
    } catch (error) {
      throw new HttpError(500, ServerCodeErrorEnum.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR', null, error);
    }
  }
}

export default TransactionService;
