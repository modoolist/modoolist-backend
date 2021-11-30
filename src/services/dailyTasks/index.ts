import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";

export default createService({
  name: "일일 할일 엔드포인트",
  baseURL: "/tasks",
  routes: [
    {
      method: "post",
      path: "/status/:id",
      handler: controllers.setTaskStatus,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/daily",
      handler: controllers.getDailyTasks,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/daily/:date",
      handler: controllers.getDailyTasks,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "get",
      path: "/weekly",
      handler: controllers.getThisPrimaryTodo,
      needAuth: true,
      needPermission: false,
    },
  ],
});
