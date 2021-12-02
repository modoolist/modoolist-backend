import { Request, Response } from "express";
import { SubTodos } from "../../models/entity/SubTodos";
import { PrimaryTodos } from "../../models/entity/PrimaryTodos";
import { HttpException } from "../../exceptions";
import dateFormatter from "../../resources/dateFormatter";
import { logger } from "../../resources/logger";

export const getDailyAchievement = async (req: Request, res: Response) => {
  try {
    const date = req.params.date ? new Date(req.params.date) : new Date();
    const achievedTasks = await SubTodos.count({
      duedate: dateFormatter(date),
      muId: req.user.id,
      isAchieved: true,
    });
    const totalTasks = await SubTodos.count({
      duedate: dateFormatter(date),
      muId: req.user.id,
    });
    return res.status(200).json({
      date: dateFormatter(date),
      totalTasks: totalTasks,
      achievedTasks: achievedTasks,
    });
  } catch (e) {
    throw new HttpException(401, e.message);
  }
};

export const getWeeklyAchievements = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const primaryTask = await PrimaryTodos.findOne({
      id: id,
      muId: req.user.id,
    });
    if (!primaryTask) {
      throw new HttpException(404, "Primary task not found");
    }
    const period = new Date(primaryTask.period);
    const achievedTasks = await SubTodos.countAchievedTasks(
      dateFormatter(period),
      dateFormatter(new Date(period.setDate(period.getDate() + 7))),
      req.user.id
    );
    achievedTasks.map((count) => {
      count.duedate = dateFormatter(count.duedate);
    });
    return res.status(200).json({
      achievedTasks: achievedTasks,
    });
  } catch (e) {
    throw new HttpException(401, e.message);
  }
};

export const getMonthlyAchievements = async (req: Request, res: Response) => {
  try {
    const date =
      new Date(req.params.date).getTime() ===
      new Date(req.params.date).getTime()
        ? new Date(req.params.date)
        : new Date();
    const achievedTasks = await SubTodos.countAchievedTasks(
      dateFormatter(new Date(date.getFullYear(), date.getMonth(), 1)), //해당 월의 1일
      dateFormatter(new Date(date.getFullYear(), date.getMonth() + 1, 0)), //해당 월의 말일
      req.user.id
    );
    achievedTasks.map((count) => {
      count.duedate = dateFormatter(count.duedate);
    });
    return res.status(200).json({
      achievedTasks: achievedTasks,
    });
  } catch (e) {
    throw new HttpException(401, e.message);
  }
};
