import { Request, Response } from "express";
import { logger } from "../../resources/logger";
import { HttpException } from "../../exceptions";
import { SubTodos } from "../../models/entity/SubTodos";
import { PrimaryTodos } from "../../models/entity/PrimaryTodos";

const dateFormatter = (date: Date) => {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

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

export const getThisPrimaryTodo = async (req: Request, res: Response) => {
  try {
    const date = new Date();
    const sunday = dateFormatter(
      new Date(date.setDate(date.getDate() - date.getDay()))
    );
    const todo = await PrimaryTodos.findOne(
      { muId: req.user.id },
      { order: { period: "DESC" } } //최근 Primary 하나만 Query
    );
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
    const date = (() => {
      if (req.params.date) {
        return new Date(req.params.date);
      } else {
        return new Date();
      }
    })();
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
