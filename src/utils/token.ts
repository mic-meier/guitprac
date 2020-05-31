import jwt from 'jsonwebtoken';
import config from '../config';

const create = (userId: string): Promise<string | Error> =>
  new Promise((resolve, reject) => {
    jwt.sign(
      {
        userId,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_LIFE_TIME,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      },
    );
  });

const getDecodedToken = (token: string): Promise<unknown> =>
  new Promise<string>((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        return reject(error);
      }

      if (!decodedToken.exp || !decodedToken.iat) {
        return reject(new Error(`Token had no 'exp' or 'iat' payload`));
      }

      resolve(decodedToken);
    });
  });

export default {
  create,
  getDecodedToken,
};
