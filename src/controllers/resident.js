import Db from '../db/db';
import Resident from '../models/resident';

import * as Response from '../helpers/response/response';
import schema from '../schema/resident';

class ResidentData {
    static async addNewResident(req, res) {
        const newResidentData = { ...req.body };
        try {
            const result = await schema.validateAsync(newResidentData);
            if (!result.error) {
                const addResidents = await Db.addResidents(Resident, newResidentData)
                return Response.responseOkCreated(res, addResidents)
            }
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
    static async getAllResidents(req, res) {
        try {
            const allResidents = await Db.getAllResidents(Resident)
            return Response.responseOk(res, allResidents)
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
    static async getResidentById(req, res) {
        const { id } = req.params;
        try {
            const residentById = await Db.getResidentById(Resident, id)
            return Response.responseOk(res, residentById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async editResident(req, res) {
        const { name, email, phone } = req.body,
            updateResident = { name, email, phone };
        try {
            const result = await schema.validateAsync(updateResident);
            if (!result.error) {
                const residentToEdit = await Db.editResident(Resident, updateResident)
                return Response.responseOk(res, residentToEdit)
            }
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
}
export default ResidentData;