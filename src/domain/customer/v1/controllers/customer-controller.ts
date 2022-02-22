import { NextFunction, Request, Response } from 'express';
import CustomerService from '../services/customer-service';

async function createCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const customer = await (new CustomerService()).createCustomer(req.body);

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    await (new CustomerService()).deleteCustomer(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export default {
  createCustomer,
  deleteCustomer
};
