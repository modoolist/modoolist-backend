import { Request, Response } from "express";
import { sendMail } from "../../resources/mailer";
import { HttpException } from "../../exceptions";
import {
  getTokenType,
  issue as issueToken,
  verify,
} from "../../resources/token";
import { Users } from "../../models/entity/Users";
import { User } from "../../interfaces";
import authMailForm from "../../resources/authMailForm";
import bcrypt from "bcrypt";
import { logger } from "../../resources/logger";

export const identifyUser = async (req: Request, res: Response) => {
  //로그인 로직
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!user && !isPasswordValid) {
    throw new HttpException(401, "잘못된 이메일 또는 패스워드입니다.");
  }
  res.status(200).json({
    accessToken: await issueToken(user, false),
    refreshToken: await issueToken(user, true),
  });
};

export const registerUser = async (req: Request, res: Response) => {
  //회원가입 로직
  const { email, password, username } = req.body as User;
  if (!Users.findOne({ email: email })) {
    throw new HttpException(400, "이미 존재하는 이메일입니다.");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = await issueToken(
      {
        email: email,
        password: hashedPassword,
        username: username,
      },
      false,
      "10m"
    );

    const mailLog = await sendMail(
      email,
      "모두리스트 이메일 인증",
      authMailForm(username, token)
    );
    logger.info(`mail sent. ${mailLog.accepted} | ${mailLog.messageId}`);

    res.sendStatus(200);
  } catch (e) {
    throw new HttpException(400);
  }
};

export const authMail = async (req: Request, res: Response) => {
  //메일 인증 로직
  const { token } = req.params;
  const decoded = await verify(token);
  const newUser = new Users();

  newUser.email = decoded.email;
  newUser.username = decoded.username;
  newUser.password = decoded.password;
  const user = await newUser.save();

  res.status(200).json({
    accessToken: await issueToken(user, false),
    refreshToken: await issueToken(user, true),
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  //비밀번호 재설정 로직
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { token: refreshToken } = req;
  if (!refreshToken)
    throw new HttpException(400, "리프레시 토큰이 전달되지 않았습니다.");

  const tokenType = await getTokenType(refreshToken);
  if (tokenType !== "REFRESH")
    throw new HttpException(400, "리프레시 토큰이 아닙니다.");

  const payload = await verify(refreshToken);
  const identity = await Users.findOne({ id: payload.idx });
  res.json({
    accessToken: await issueToken(identity, false),
    refreshToken: await issueToken(identity, true),
  });
};
