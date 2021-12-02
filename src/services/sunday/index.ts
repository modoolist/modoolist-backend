import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";

export default createService({
  name: "일요일 엔드포인트",
  baseURL: "/sunday",
  routes: [
    {
      method: "post",
      path: "/primtask",
      handler: controllers.newPrimTask,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "post",
      path: "/subtasks/:id/:date",
      handler: controllers.newSubTasks,
      needAuth: true,
      needPermission: false,
    },
  ],
});
