import Db from '../db/db';
import Admin from '../models/admin';

import Token from '../helpers/jwt/token';
import bcrypt from '../helpers/bcrypt/bcrypt'
import validator from '../validator/admin';
import * as Response from '../helpers/response/response';

class AdminData {
    static async addAdmin(req, res) {
        const { username, password } = req.body;
        try {
            const result = await validator.validateAsync(req.body);
            if (!result.error) {
                const admin = await Db.findAdmin(Admin, username)
                if (admin != null) {
                    return Response.responseConflict(res, admin)
                } else {
                    const hash = await bcrypt.hashPassword(password, 10);
                    const adminUser = { ...req.body, password: hash };
                    const { username, _id: adminId } = await Db.saveAdmin(Admin, adminUser);
                    const token = Token.sign({ username, adminId })
                    const adminData = { username, adminId, token }
                    return Response.responseOkUserCreated(res, adminData);
                }
            }
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
    static async adminLogin(req, res) {
        const { username, password } = req.body;
        try {
            const result = await validator.validateAsync(req.body);
            if (!result.error) {
                const admin = await Db.findAdmin(Admin, username)
                if (admin == null) {
                    return Response.responseBadAuth(res, admin)
                }
                const isSamePassword = await bcrypt.comparePassword(password, admin.password)
                if (isSamePassword) {
                    const token = Token.sign({ username: admin.username, adminId: admin._id })
                    const adminData = { admin, token }
                    return Response.responseOk(res, adminData)
                }
                return Response.responseBadAuth(res)
            } else {
                return Response.responseValidationError(res)
            }
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
    static async getAllAdmins(req, res) {
        try {
            const allAdmins = await Db.getAllAdmins(Admin)
            return Response.responseOk(res, allAdmins)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getAdminById(req, res) {
        const { id } = req.params;
        try {
            const adminById = await Db.getAdminById(Admin, id)
            return Response.responseOk(res, adminById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async deleteAdmin(req, res) {
        const { id } = req.params;
        try {
            const adminToDelete = await Db.removeAdmin(Admin, id)
            return Response.responseOk(res, adminToDelete)
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
}


export default AdminData