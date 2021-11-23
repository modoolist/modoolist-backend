import jwt from "jsonwebtoken";
import { User } from "../interfaces";
import config from "../config";
import { HttpException } from "../exceptions";
import { TokenType } from "../types";
import { logger } from "../resources/logger";

export const getTokenType = async (token: string): Promise<TokenType> => {
  try {
    const payload: any = await jwt.verify(token, config.jwtSecret as string);
    return payload.refresh ? "REFRESH" : "ACCESS";
  } catch (e) {
    logger.error(e);
    if (e.name === "TokenExpiredError") {
      throw new HttpException(401, "토큰이 만료되었습니다.");
    } else if (["jwt malformed", "invalid signature"].includes(e.message)) {
      throw new HttpException(401, "토큰이 변조되었습니다.");
    } else throw new HttpException(401, "토큰에 문제가 있습니다.");
  }
};

export const verify = async (token: string) => {
  try {
    const { identity }: any = await jwt.verify(
      token,
      config.jwtSecret as string
    );
    return identity;
  } catch (e) {
    logger.error(e);
    if (e.name === "TokenExpiredError") {
      throw new HttpException(401, "토큰이 만료되었습니다.");
    } else if (["jwt malformed", "invalid signature"].includes(e.message)) {
      throw new HttpException(401, "토큰이 변조되었습니다.");
    } else throw new HttpException(401, "토큰에 문제가 있습니다.");
  }
};

export const issue = async (
  identity: User,
  refresh: boolean,
  expiresIn?: string
) => {
  if (refresh) {
    const token = await jwt.sign(
      {
        identity: {
          idx: identity.id,
        },
        refresh: true,
      },
      config.jwtSecret as string,
      {
        algorithm: "HS512",
        expiresIn: "1y",
      }
    );
    return token;
  }
  const token = await jwt.sign(
    {
      identity,
      refresh: false,
    },
    config.jwtSecret as string,
    {
      algorithm: "HS512",
      expiresIn: expiresIn ? expiresIn : "1w",
    }
  );
  return token;
};
