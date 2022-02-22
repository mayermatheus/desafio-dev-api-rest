import env from 'dotenv';
import path from 'path';

env.config({ path: path.resolve('.env') });
process.env.ENVIRONMENT = process.env.ENVIRONMENT || process.env.NODE_ENV;

class Config {
  public static DEV: boolean = process.env.ENVIRONMENT === 'dev';
  public static PROD: boolean = process.env.ENVIRONMENT === 'prod';

  public static SERVERS = {
    http: {
      hostname: process.env.HTTP_HOST || 'localhost',
      port: parseInt(process.env.HTTP_PORT, 10) || 3000,
    },
  };

  public static BANK_INFO = {
    agencyNumber: Number(process.env.AGENCY_NUMBER) || 0,
    defaultLimitPerDaily: Number(process.env.LIMIT_PER_DAILY) || 2000,
  }
}

export default Config;
