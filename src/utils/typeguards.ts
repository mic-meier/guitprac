/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const isString = (x: any): x is string => {
  return typeof x === 'string' || x instanceof String;
};

export const parseEnvVariable = (port: any): string => {
  if (!port || !isString(port)) {
    throw new Error('Could not load PORT from .env');
  }
  return port;
};
