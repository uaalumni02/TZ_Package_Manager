import Db from "../db/db";
import User from "../models/user";

import Token from "../helpers/jwt/token";
import bcrypt from "../helpers/bcrypt/bcrypt";
import validator from "../validator/user";
import * as Response from "../helpers/response/response";

const token = ""
class UserData {
  static async addUser(req, res) {
    const { username, password, role } = req.body;
    try {
      const result = await validator.validateAsync(req.body);
      if (!result.error) {
        const user = await Db.findUser(User, username);
        if (user != null) {
          return Response.responseConflict(res, user);
        } else {
          const hash = await bcrypt.hashPassword(password, 10);
          const user = { ...req.body, password: hash };
          const { username, _id: userId, role } = await Db.saveUser(User, user);
          if (role == "admin" || role == "super admin") {
             token = Token.sign({ username, userId, role });
          }
          const userData = { username, userId, token, role };
          return Response.responseOkUserCreated(res, userData);
        }
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async userLogin(req, res) {
    const { username, password } = req.body;
    try {
      const result = await validator.validateAsync(req.body);
      if (!result.error) {
        const user = await Db.findUser(User, username);
        if (user == null) {
          return Response.responseBadAuth(res, user);
        }
        const isSamePassword = await bcrypt.comparePassword(
          password,
          user.password
        );
        if (isSamePassword && user.role) {
          const token = Token.sign({
            username: user.username,
            userId: user._id,
            role: user.role
          });
          const userData = { user, token };
          return Response.responseOk(res, userData);
        }
        return Response.responseBadAuth(res);
      } else {
        return Response.responseValidationError(res);
      }
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async getAllUsers(req, res) {
    const token = req.get('Authorization').split(' ')[1]
    const decodedUser = Token.decode(token);
    const userTypes = ['standard', 'admin'];
    
    try {
      const allUsers = await Db.getAllUsers(User);
      const adminStandardUsers = allUsers.filter(user => {
        return userTypes.includes(user.role) && user.username != decodedUser.username || !user.role
      })
      return Response.responseOk(res, adminStandardUsers);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const userById = await Db.getUserById(User, id);
      return Response.responseOk(res, userById);
    } catch (error) {
      return Response.responseNotFound(res);
    }
  }
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const userToDelete = await Db.removeUser(User, id);
      return Response.responseOk(res, userToDelete);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
  static async approveUser(req, res) {
    const userId = req.params.id;
    const userData = { ...req.body };
    const { isAdmin } = req.body;

    const updateApproval = {
      isAdmin
    };
    try {
      const approved = await Db.approveUser(User, userId, userData);
      return Response.responseOk(res, updateApproval, approved);
    } catch (error) {
      return Response.responseServerError(res);
    }
  }
}

export default UserData;
