import HttpError from "@errors/http-error";
import { CodeErrorEnum } from "../enums/code-error-enum";

export default class AccountWithoutLimitDay extends HttpError {
  constructor(report?: any, error?: Error) {
    super(
      400,
      CodeErrorEnum.ACCOUNT_WITHOUT_LIMIT_DAY,
      'Account without limit of day',
      report,
      error
    );

    this.report = report?.response ? { ...report.response } : report;
  }
}
