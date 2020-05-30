import dotenv from 'dotenv';
import utils = require('./utils/typeguards');

dotenv.config();

const NODE_ENV = utils.parseEnvVariable(process.env.NODE_ENV);
const PORT = utils.parseEnvVariable(process.env.PORT);
const MONGODB_URI = utils.parseEnvVariable(process.env.MONGODB_URI);

export default {
  NODE_ENV,
  PORT,
  MONGODB_URI,
};
