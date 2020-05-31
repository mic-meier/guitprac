import tokenUtil from './token';
import User from '../models/user';
import { parseString } from './typeguards';
import { IncomingMessage } from 'http';

const TOKEN_HEADER_NAME = 'x-token';

type Req = { req: IncomingMessage };

const getUser = async (req: Req): Promise<unknown | null> => {
  if (!req) {
    return null;
  }

  const tokenHeader: string = req.get(
    parseString(TOKEN_HEADER_NAME, 'TOKEN_HEADER_NAME'),
  );

  if (!tokenHeader) {
    return null;
  }

  try {
    const decodedToken: Promise<unknown> = await tokenUtil.getDecodedToken(
      tokenHeader,
    );
    return await User.findById(decodedToken.userId);
  } catch (e) {
    return null;
  }
};

export default getUser;
