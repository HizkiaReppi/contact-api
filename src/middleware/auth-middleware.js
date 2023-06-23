import { prismaClient } from '../utils/database.js';
import { logger } from '../utils/logging.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    logger.error('Unauthorized');

    res
      .status(401)
      .json({
        status: false,
        code: 401,
        errors: 'Unauthorized',
      })
      .end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token,
      },
    });

    if (!user) {
      logger.error('Unauthorized');

      res
        .status(401)
        .json({
          status: false,
          code: 401,
          errors: 'Unauthorized',
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};
