import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export enum EErrors {
  USER_NOT_EXIST = '01',
  WRONG_CREDENTIALS = '02',
  LOGIN_ALREADY_USED = '03',
  ROLE_NOT_EXIST = '04',
}

export const getServiceErrorCode = (errorCode: EErrors): string => {
  return `${process.env.SERVICE_ERROR_ID}${errorCode}`;
};
