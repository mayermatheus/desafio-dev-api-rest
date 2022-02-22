import moxios from 'moxios';
import { cpf } from 'cpf-cnpj-validator';
import faker from 'faker';
import supertest from 'supertest';
import App from './app';
import { repositoryMock, selectQueryBuilderMock } from '@domain/test/mocks/typeorm.mock';
import { CreateCustomerBody } from '@domain/customer/v1/interfaces/create-customer-body';
import { CreateCustomerResponse } from '@domain/customer/v1/interfaces/create-customer-response';
import { CreateAccountBody } from '@domain/account/v1/interfaces/create-account-body';
import { AccountResponse } from '@domain/account/v1/interfaces/account-response';
import { fakeAccountStatus } from '@domain/test/mocks/account.mock';
import Config from '@config/app-config';
import { PatchAccountBody } from '@domain/account/v1/interfaces/patch-account-body';
import Account from '@domain/account/v1/entities/account';

const app = new App().express;

describe('Spec integration app', () => {

  beforeEach(() => {
    moxios.install();
    repositoryMock.findOne.mockRestore();
    repositoryMock.createQueryBuilder.mockRestore();
    selectQueryBuilderMock.leftJoinAndSelect.mockRestore();
    selectQueryBuilderMock.where.mockRestore();
    selectQueryBuilderMock.getOne.mockRestore();
    repositoryMock.save.mockRestore();
  });

  afterEach(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    moxios.uninstall();
  });

  test('Should response 201 when called http method post and access /api/v1/customers', async () => {
    const nationalRegistration = cpf.generate();
    const name = faker.datatype.string();
    const createCustomerBodyMock = {
      nationalRegistration,
      name,
    } as CreateCustomerBody;

    const createCustomerResponseMock = {
      id: faker.datatype.uuid(),
      name,
      nationalRegistration
    } as CreateCustomerResponse;

    repositoryMock.findOne.mockResolvedValue(null);
    repositoryMock.save.mockResolvedValue(createCustomerResponseMock);

    const response = await supertest(app)
      .post('/api/v1/customers')
      .send(createCustomerBodyMock)

    const responseData = response.body;

    expect(response.status).toBe(201);
    expect(responseData).toBeTruthy();
    expect(responseData).toEqual(createCustomerResponseMock);
  });

  test('Should response 409 when called http method post and access /api/v1/customers with national registration duplicated', async () => {
    const nationalRegistration = cpf.generate();
    const name = faker.datatype.string();
    const createCustomerBodyMock = {
      nationalRegistration,
      name,
    } as CreateCustomerBody;

    const customerFoundMock = {
      id: faker.datatype.uuid(),
      name,
      nationalRegistration
    } as CreateCustomerResponse;

    repositoryMock.findOne.mockResolvedValue(customerFoundMock);

    const response = await supertest(app)
      .post('/api/v1/customers')
      .send(createCustomerBodyMock)

    const responseData = response.body;

    expect(response.status).toBe(409);
    expect(responseData).toBeTruthy();
    expect(responseData).toEqual({ code: 1001, message: 'National registration duplicated', exception: '' });
  });

  test('Should response 204 when called http method delete and access /api/v1/customers/:id', async () => {
    const id = faker.datatype.uuid();
    repositoryMock.findOne.mockResolvedValue({ id, name: faker.datatype.string(), nationalRegistration: faker.datatype.number() });
    repositoryMock.update.mockResolvedValue(null);

    const response = await supertest(app)
      .delete(`/api/v1/customers/${id}`)
      .send()

    const responseData = response.body;

    expect(response.status).toBe(204);
    expect(responseData).toEqual({});
  });

  test('Should response 404 when called http method delete and access /api/v1/customers/:id with id without exist', async () => {
    repositoryMock.findOne.mockResolvedValue(null);

    const response = await supertest(app)
      .delete(`/api/v1/customers/${faker.datatype.uuid()}`)
      .send()
    const responseData = response.body;

    expect(response.status).toBe(404);
    expect(responseData).toEqual({ code: 1002, message: 'Customer not found', exception: '' });
  });

  test('Should response 201 when called http method post and access /api/v1/accounts/', async () => {
    const nationalRegistration = cpf.generate();
    const createAccountBodyMock = {
      nationalRegistration,
    } as CreateAccountBody;

    const customer = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      nationalRegistration,
    } as CreateCustomerResponse

    const createAccountResponseMock = {
      id: faker.datatype.uuid(),
      agency: Config.BANK_INFO.agencyNumber,
      customer,
      dailyWithDrawalLimit: Config.BANK_INFO.defaultLimitPerDaily,
      isActive: faker.datatype.boolean(),
      number: faker.datatype.number(),
      status: fakeAccountStatus(),
      value: faker.datatype.number(),
    } as AccountResponse;

    repositoryMock.findOne.mockResolvedValue(customer);
    repositoryMock.save.mockResolvedValue(createAccountResponseMock);

    const response = await supertest(app)
      .post('/api/v1/accounts')
      .send(createAccountBodyMock)

    const responseData = response.body;

    expect(response.status).toBe(201);
    expect(responseData).toBeTruthy();
    expect(responseData).toEqual(createAccountResponseMock);
  });

  test('Should response 404 when called http method post and access /api/v1/accounts/ and customer not found', async () => {
    const nationalRegistration = cpf.generate();
    const createAccountBodyMock = {
      nationalRegistration,
    } as CreateAccountBody;

    repositoryMock.findOne.mockResolvedValue(null);

    const response = await supertest(app)
      .post('/api/v1/accounts')
      .send(createAccountBodyMock)

    const responseData = response.body;

    expect(response.status).toBe(404);
    expect(responseData).toBeTruthy();
    expect(responseData).toEqual({ code: 1002, message: 'Customer not found', exception: '' });
  });

  test('Should response 204 when called http method patch and access /api/v1/accounts/:id', async () => {
    const nationalRegistration = cpf.generate();
    const status = fakeAccountStatus();
    const patchAccountBodyMock = {
      status,
    } as PatchAccountBody;
    const customer = {
      id: faker.datatype.uuid(),
      name: faker.datatype.string(),
      nationalRegistration,
    } as CreateCustomerResponse
    const account = {
      id: faker.datatype.uuid(),
      agency: Config.BANK_INFO.agencyNumber,
      customer,
      dailyWithDrawalLimit: Config.BANK_INFO.defaultLimitPerDaily,
      isActive: faker.datatype.boolean(),
      number: faker.datatype.number(),
      status,
      value: faker.datatype.number(),
      transactions: [],
    } as Account;

    selectQueryBuilderMock
      .leftJoinAndSelect
      .mockReturnThis()
      .mockReturnThis();

    selectQueryBuilderMock.where.mockReturnThis();

    selectQueryBuilderMock.getOne.mockResolvedValue(account);
    
    repositoryMock.createQueryBuilder.mockReturnValue(selectQueryBuilderMock);

    const response = await supertest(app)
      .patch(`/api/v1/accounts/${account.id}`)
      .send(patchAccountBodyMock)

    const responseData = response.body;

    expect(response.status).toBe(204);
    expect(responseData).toBeTruthy();
    expect(responseData).toEqual({});
  });

  test('Should response 404 when called http method patch and access /api/v1/accounts/:id and id not exist', async () => {
    const patchAccountBodyMock = {
      status: fakeAccountStatus(),
    } as PatchAccountBody;

    selectQueryBuilderMock
      .leftJoinAndSelect
      .mockReturnThis()
      .mockReturnThis();

    selectQueryBuilderMock.where.mockReturnThis();

    selectQueryBuilderMock.getOne.mockResolvedValue(null);
    
    repositoryMock.createQueryBuilder.mockReturnValue(selectQueryBuilderMock);

    const response = await supertest(app)
      .patch(`/api/v1/accounts/${faker.datatype.uuid()}`)
      .send(patchAccountBodyMock)

    const responseData = response.body;

    expect(response.status).toBe(404);
    expect(responseData).toBeTruthy();
    expect(responseData).toEqual({ code: 3001, message: 'Account not found', exception: '' });
  });
});
