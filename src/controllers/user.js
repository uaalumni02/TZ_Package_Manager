import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//import model
import User from '../models/user';

import * as Response from '../helpers/response/response';

import Db from '../db/db';

import Token from '../helpers/jwt/token';

import PswdHash from '../helpers/bcrypt/bcrypt'


class userData {
    static async addUser(req, res) {
        const username = req.body.username;
        try {
            const user = await Db.findUser(User, username)
            if (user.length >= 1) {
                return Response.responseConflict(res, user)
            } else {
                const password = await PswdHash.hashPassword(req.body.password, 10);
                const user = { ...req.body, password };
                const newUser = Db.saveUser(User, user)
                return Response.responseOkUserCreated(res, newUser);
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async userLogin(req, res) {
        const username = req.body.username
        try {
            const user = await Db.findUser(User, username)
            if (user.length < 1) {
                return Response.responseBadAuth(res, user)
            }
            const compare = await PswdHash.compareHash(req.body.password, user[0].password)
            const result = { ...req.body, compare };
            if (result) {
                const token = Token.sign({ username: user[0].username, userId: user[0]._id })
                return res.status(200).json({
                    token: token,
                    userId: user[0]._id
                });
            }
        } catch (error) {
            return Response.responseBadAuth(res, user)
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