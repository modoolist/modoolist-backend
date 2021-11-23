import * as controllers from "./controllers";
import { createService } from "../index";
import Joi from "joi";

export default createService({
  name: "인증 서비스",
  baseURL: "/auth",
  routes: [
    {
      method: "post",
      path: "/register",
      handler: controllers.registerUser,
      needAuth: false,
      needPermission: false,
      validateSchema: {
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&;:"'~])[A-Za-z\d$@$!%*#?&;:"'~]{8,}$/
          )
          .required(),
        username: Joi.string().required(),
      },
    },
    {
      method: "post",
      path: "/certmail/:token",
      handler: controllers.authMail,
      needAuth: false,
      needPermission: false,
    },
    {
      method: "post",
      path: "/",
      handler: controllers.identifyUser,
      needAuth: false,
      needPermission: false,
      validateSchema: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
    {
      method: "post",
      path: "/refresh",
      handler: controllers.refreshAccessToken,
      needAuth: true,
      needPermission: false,
    },
  ],
});
