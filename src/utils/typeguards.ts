/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const isString = (x: any): x is string => {
  return typeof x === 'string' || x instanceof String;
};

export const parseEnvVariable = (value: any, description: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Could not load ${description} from .env: ${value}`);
  }
  return value;
};

export const parseString = (value: any, description: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${description}: ${value}`);
  }
  return value;
};
