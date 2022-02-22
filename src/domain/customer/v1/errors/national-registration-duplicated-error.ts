import HttpError from "@errors/http-error";
import { CodeErrorEnum } from "../enums/code-error-enum";

export default class NationalRegistrationDuplicatedError extends HttpError {
  constructor(report?: any, error?: Error) {
    super(
      409,
      CodeErrorEnum.NATIONAL_REGISTRATION_DUPLICATED,
      'National registration duplicated',
      report,
      error
    );

    this.report = report?.response ? { ...report.response } : report;
  }
}
