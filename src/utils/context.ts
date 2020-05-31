import tokenUtil from './token';
import User from '../models/user';

const TOKEN_HEADER_NAME = 'x-token';

const getUser = async (req: Request): Promise<unknown | null> => {
  if (!req) {
    return null;
  }

  const tokenHeader: string = req.get(TOKEN_HEADER_NAME);

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
