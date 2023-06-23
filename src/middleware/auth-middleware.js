import { prismaClient } from '../utils/database.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
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
