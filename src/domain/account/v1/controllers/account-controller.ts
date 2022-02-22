import { NextFunction, Request, Response } from 'express';
import AccountService from '../services/account-service';

async function createAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const account = await (new AccountService()).createAccount(req.body);

    res.status(201).json(account);
  } catch (error) {
    next(error);
  }
}

async function patchAccount(req: Request, res: Response, next: NextFunction) {
  try {
    await (new AccountService()).patchAccount(req.params.id, req.body);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export default {
  createAccount,
  patchAccount,
};
