import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import HttpError from '@errors/http-error';
import { CreateCustomerBody } from '../interfaces/create-customer-body';
import Customer from '../entities/customer';
import { CreateCustomerResponse } from '../interfaces/create-customer-response';
import NationalRegistrationDuplicatedError from '../errors/national-registration-duplicated-error';
import DefaultError from '@errors/default-error';
import { ServerCodeErrorEnum } from '@enums/server-code-error-enum';
import CustomerNotFoundError from '../errors/customer-not-found-error';

class CustomerService {
  public async createCustomer(createCustomerBody: CreateCustomerBody): Promise<CreateCustomerResponse> {
    try {
      const customerRepository = getRepository(Customer);

      const customerFound = await customerRepository.findOne({
        nationalRegistration: createCustomerBody.nationalRegistration,
        isActive: true,
      });

      if (customerFound) {
        throw new NationalRegistrationDuplicatedError();
      }

      const customer = await customerRepository.save({
        id: uuidv4().toString(),
        nationalRegistration: createCustomerBody.nationalRegistration,
        name: createCustomerBody.name,
      });

      return { id: customer.id, name: customer.name, nationalRegistration: customer.nationalRegistration };
    } catch (error) {
      if (error instanceof DefaultError) {
        throw error;
      }

      throw new HttpError(500, ServerCodeErrorEnum.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR', null, error);
    }
  }

  public async deleteCustomer(id: string): Promise<void> {
    try {
      const customerRepository = getRepository(Customer);

      const customerFound = await customerRepository.findOne({
        id,
        isActive: true,
      });

      if (!customerFound) {
        throw new CustomerNotFoundError();
      }

      await customerRepository.update(id, { isActive: false });
    } catch (error) {
      if (error instanceof DefaultError) {
        throw error;
      }

      throw new HttpError(500, ServerCodeErrorEnum.INTERNAL_SERVER_ERROR, 'INTERNAL SERVER ERROR', null, error);
    }
  }
}

export default CustomerService;
