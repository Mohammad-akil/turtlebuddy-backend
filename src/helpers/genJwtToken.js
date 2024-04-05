import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default (userId) =>jwt.sign({ userId }, config.jwt.secret, {expiresIn: config.jwt.registerExpire,});
