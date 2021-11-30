import { Request, Response } from "express";
import { SubTodos } from "../../models/entity/SubTodos";
import { PrimaryTodos } from "../../models/entity/PrimaryTodos";
import { logger } from "../../resources/logger";
import { HttpException } from "../../exceptions";

export const newPrimTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const primTodo = new PrimaryTodos();
    primTodo.muId = req.user.id;
    primTodo.title = title;
    res.status(201).send(await primTodo.save());
  } catch (e) {
    throw new HttpException(400, "태스크 등록에 실패했습니다.");
  }
};

export const newSubTodo = async (req: Request, res: Response) => {
  try {
    const date = new Date(req.params.date);
    const { title, id } = req.body;

    if (!(await PrimaryTodos.findOne({ id, muId: req.user.id }))) {
      throw new HttpException(400, "등록할 수 없는 태스크입니다.");
    }
    const subTodo = new SubTodos();
    subTodo.muId = req.user.id;
    subTodo.mptId = id as unknown as number;
    subTodo.title = title;
    subTodo.period = date;
    res.status(201).send(await subTodo.save());
  } catch (e) {
    throw new HttpException(400, "태스크 등록에 실패했습니다.");
  }
};
