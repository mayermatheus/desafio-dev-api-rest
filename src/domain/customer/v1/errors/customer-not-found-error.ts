import HttpError from "@errors/http-error";
import { CodeErrorEnum } from "../enums/code-error-enum";

export default class CustomerNotFoundError extends HttpError {
  constructor(report?: any, error?: Error) {
    super(
      404,
      CodeErrorEnum.CUSTOMER_NOT_FOUND,
      'Customer not found',
      report,
      error
    );

    this.report = report?.response ? { ...report.response } : report;
  }
}
