import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";

export default createService({
  name: "일요일 엔드포인트",
  baseURL: "/sunday",
  routes: [
    {
      method: "post",
      path: "/primtodo",
      handler: controllers.newPrimTodo,
      needAuth: true,
      needPermission: false,
    },
    {
      method: "post",
      path: "/subtodo/:date",
      handler: controllers.newSubTodo,
      needAuth: true,
      needPermission: false,
    },
  ],
});
