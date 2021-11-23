import { Request, Response, NextFunction } from "express";
import { logger } from "../resources/logger";
import { verify } from "../resources/token";

const attachIdentity = async (
  req: Request,
  Res: Response,
  next: NextFunction
) => {
  if (!req.token) {
    return next();
  }
  const { token } = req;
  try {
    const identity = await verify(token);
    req.user = identity;
    next();
  } catch (e) {
    logger.error(e);
    return next(e);
  }
};

export default attachIdentity;
