import HttpError from "@errors/http-error";
import { CodeErrorEnum } from "../enums/code-error-enum";

export default class AccountBlockedError extends HttpError {
  constructor(report?: any, error?: Error) {
    super(
      400,
      CodeErrorEnum.ACCOUNT_BLOCKED,
      'Account blocked',
      report,
      error
    );

    this.report = report?.response ? { ...report.response } : report;
  }
}
