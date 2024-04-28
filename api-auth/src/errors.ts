import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export enum EErrors {
  JWT_MALFORMED = '01',
}

export const getServiceErrorCode = (errorCode: EErrors): string => {
  return `${process.env.SERVICE_ERROR_ID}${errorCode}`;
};
