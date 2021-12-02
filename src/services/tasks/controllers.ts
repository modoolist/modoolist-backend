import { Request, Response } from "express";
import { HttpException } from "../../exceptions";
import { SubTodos } from "../../models/entity/SubTodos";
import { PrimaryTodos } from "../../models/entity/PrimaryTodos";
import dateFormatter from "../../resources/dateFormatter";

export const setTaskStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const { status } = req.body;
    const todo = await SubTodos.findOne({
      id,
      muId: req.user.id,
    });
    todo.isAchieved = status;
    res.status(200).send(await todo.save());
  } catch (e) {
    if (e.message) {
      throw new HttpException(400, e.message);
    }
    throw new HttpException(400, "에러");
  }
};

export const getPrimaryTask = async (req: Request, res: Response) => {
  try {
    const date =
      req.params.date !== "today" ? new Date(req.params.date) : new Date();
    const sunday = dateFormatter(
      new Date(date.setDate(date.getDate() - date.getDay()))
    );
    const todo = await PrimaryTodos.findOne({
      muId: req.user.id,
      period: sunday,
    });
    if (todo.period.toString() === sunday) {
      return res.status(200).send(todo); //이번 Period의 Task만 반환
    }
    return res.sendStatus(404);
  } catch (e) {
    if (e.message) {
      throw new HttpException(400, e.message);
    }
    throw new HttpException(400, "에러");
  }
};

export const getDailyTasks = async (req: Request, res: Response) => {
  try {
    const date = req.params.date ? new Date(req.params.date) : new Date();
    const formattedDate = dateFormatter(date);
    const todos = await SubTodos.find({
      muId: req.user.id,
      duedate: formattedDate,
    });
    res.status(200).send(todos);
  } catch (e) {
    if (e.message) {
      throw new HttpException(400, e.message);
    }
    throw new HttpException(400, "에러");
  }
};

export const getPrimaryTasks = async (req: Request, res: Response) => {
  try {
    const todos = await PrimaryTodos.find({
      muId: req.user.id,
    });
    res.status(200).send(todos);
  } catch (e) {
    if (e.message) {
      throw new HttpException(400, e.message);
    }
    throw new HttpException(400, "에러");
  }
};

export const getWeeklyTasks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todos = await SubTodos.find({
      muId: req.user.id,
      mptId: id as unknown as number,
    });
    res.status(200).send(todos);
  } catch (e) {
    if (e.message) {
      throw new HttpException(400, e.message);
    }
    throw new HttpException(400, "에러");
  }
};
