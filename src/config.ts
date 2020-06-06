import dotenv from 'dotenv';
import utils = require('./utils/typeguards');

dotenv.config();

const NODE_ENV = utils.parseEnvVariable(process.env.NODE_ENV, 'NODE_ENV');
const PORT = utils.parseEnvVariable(process.env.PORT, 'PORT');
let MONGODB_URI = utils.parseEnvVariable(
  process.env.MONGODB_URI,
  'MONGODB_URI',
);

if (NODE_ENV === 'test') {
  MONGODB_URI = utils.parseEnvVariable(
    process.env.TEST_MONGODB_URI,
    'TEST_MONGOBD_URI',
  );
}

const JWT_SECRET = utils.parseEnvVariable(process.env.JWT_SECRET, 'JWT_SECRET');
const JWT_LIFE_TIME = utils.parseEnvVariable(
  process.env.JWT_LIFE_TIME,
  'JWT_LIFE_TIME',
);

const SESSION_SECRET = utils.parseEnvVariable(
  process.env.SESSION_SECRET,
  'SESSION_SECRET',
);

export default {
  NODE_ENV,
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  JWT_LIFE_TIME,
  SESSION_SECRET,
};
