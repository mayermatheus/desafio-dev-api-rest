import { AccountResponse } from "@domain/account/v1/interfaces/account-response";
import { TypeTransactionEnum } from "../enums/type-transaction-enum";

export interface CreateTransactionCreditResponse {
    id: string;
    type: TypeTransactionEnum;
    value: number;
    account: AccountResponse;
}
