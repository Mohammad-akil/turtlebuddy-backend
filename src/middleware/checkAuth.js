import { RESPONSE } from '../helpers/index.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js'
import userModel from "../models/user/user.model.js"

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return RESPONSE.error(res, 1011);
    }

    const accessToken = authorization.split(' ')[1];
    try {
        const decode = jwt.verify(accessToken, config.jwt.secret);
        req.user = { userId: decode.userId };
        next();
    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 1010);
    }
};

const authPermission = (...roles) => {
    return async (req, res, next) => {

        const find = await userModel.findById(req.user.userId);
        if (!roles.includes(find.role)) {
            return RESPONSE.error(res, "Unauthorized");
        }
        next();
    }
};


export { checkAuth, authPermission };