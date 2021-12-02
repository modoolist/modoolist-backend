import * as controllers from "./controllers";
import { createService } from "../index";

export default createService({
  name: "성취도 엔드포인트",
  baseURL: "/achievement",
  routes: [
    {
      method: "get",
      path: "/daily/:date",
      handler: controllers.getDailyAchievement,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/daily",
      handler: controllers.getDailyAchievement,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/weekly/:id",
      handler: controllers.getWeeklyAchievements,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/monthly/:date",
      handler: controllers.getMonthlyAchievements,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/monthly",
      handler: controllers.getMonthlyAchievements,
      needAuth: true,
      needPermission: false,
    },
  ],
});
