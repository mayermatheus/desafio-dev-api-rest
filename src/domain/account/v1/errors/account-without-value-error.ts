import HttpError from "@errors/http-error";
import { CodeErrorEnum } from "../enums/code-error-enum";

export default class AccountWithoutValueError extends HttpError {
  constructor(report?: any, error?: Error) {
    super(
      400,
      CodeErrorEnum.ACCOUNT_WITHOUT_VALUE,
      'Account without balance',
      report,
      error
    );

    this.report = report?.response ? { ...report.response } : report;
  }
}
