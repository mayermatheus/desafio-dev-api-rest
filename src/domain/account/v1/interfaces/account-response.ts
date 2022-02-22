import { CreateCustomerResponse } from "@domain/customer/v1/interfaces/create-customer-response";
import { AccountStatus } from "./account-status";

export interface AccountResponse {
    id: string;
    customer: CreateCustomerResponse;
    agency: number;
    number: number;
    dailyWithDrawalLimit: number;
    value: number;
    status: AccountStatus;
    isActive: boolean;
}
