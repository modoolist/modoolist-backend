import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { issueToken } from "../../resources/token";
import { User } from "../../interfaces";

export const identifyUser = async (req: Request, res: Response) => {
  //로그인 로직
};

export const registerUser = async (req: Request, res: Response) => {
  //회원가입 로직
};

export const resetPassword = async (req: Request, res: Response) => {
  //비밀번호 재설정 로직
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  //토큰 재발급 로직
};
