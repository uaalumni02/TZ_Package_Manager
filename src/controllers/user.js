import Db from '../db/db';
import User from '../models/user';

import Token from '../helpers/jwt/token';
import bcrypt from '../helpers/bcrypt/bcrypt'
import schema from '../schema/user';
import * as Response from '../helpers/response/response';


class userData {
    static async addUser(req, res) {
        const { username, password } = req.body;
        try {
            const result = await schema.validateAsync(req.body);
            if (!result.error) {
                const user = await Db.findUser(User, username)
                if (user != null) {
                    return Response.responseConflict(res, user)
                } else {
                    const hash = await bcrypt.hashPassword(password, 10);
                    const user = { ...req.body, password: hash };
                    const newUser = Db.saveUser(User, user)
                    return Response.responseOkUserCreated(res, newUser);
                }
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async userLogin(req, res) {
        const { username, password } = req.body;
        try {
            const result = await schema.validateAsync(req.body);
            if (!result.error) {
                const user = await Db.findUser(User, username)
                if (user == null) {
                    return Response.responseBadAuth(res, user)
                }
                const isSamePassword = await bcrypt.comparePassword(password, user.password)
                if (isSamePassword) {
                    const token = Token.sign({ username: user.username, userId: user._id })
                    return Response.responseOk(res, token)
                }
            } else {
                return Response.responseBadAuth(res, user)
            }
        } catch (error) {
            return Response.responseServerError(res, user)
        }
    }
    static async getAllUsers(req, res) {
        try {
            const allUsers = await Db.getAllUsers(User)
            return Response.responseOk(res, allUsers)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const userById = await Db.getUserById(User, id)
            return Response.responseOk(res, userById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const userToDelete = await Db.removeUser(User, id)
            return Response.responseOk(res, userToDelete)
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
}


export default userData