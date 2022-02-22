import HttpError from "@errors/http-error";
import { CodeErrorEnum } from "../enums/code-error-enum";

export default class AccountNotFoundError extends HttpError {
  constructor(report?: any, error?: Error) {
    super(
      404,
      CodeErrorEnum.ACCOUNT_NOT_FOUND,
      'Account not found',
      report,
      error
    );

    this.report = report?.response ? { ...report.response } : report;
  }
}
