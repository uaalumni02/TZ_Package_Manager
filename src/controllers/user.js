import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//import model
import User from '../models/user';

import * as Response from '../helpers/response/response';

import * as db from '../db/db';

import userPayload from '../helpers/jwt/token'

class userData {
    static async addUser(req, res) {
        const username = req.body.username
        try {
            const user = await db.findUser(User, username)
            if (user.length >= 1) {
                return Response.responseConflict(res, user)
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    const password = hash
                    db.addUser(User, req.body, password)
                    return Response.responseOkUserCreated(res, user)
                })
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async userLogin(req, res) {
        const username = req.body.username
        try {
            const user = await db.findUser(User, username)
            if (user.length < 1) {
                return Response.responseBadAuth(res, user)
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return Response.responseBadAuth(res, user)
                }
                if (result) {
                    const token = userPayload.sign({ username: user[0].username, userId: user[0]._id })
                    return res.status(200).json({
                        token: token,
                        userId: user[0]._id
                    });
                }
                return Response.responseBadAuth(res, user)
            })

        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getAllUsers(req, res) {
        try {
            const allUsers = await db.getAllUsers(User)
            return Response.responseOk(res, allUsers)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const userById = await db.getUserById(User, id)
            return Response.responseOk(res, userById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const userToDelete = await db.removeUser(User, id)
            return res.status(200).json(userToDelete)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}


export default userData