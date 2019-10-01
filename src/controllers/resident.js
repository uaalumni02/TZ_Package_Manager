import Resident from '../models/resident';
import * as db from '../db/db';
import * as Response from '../helpers/response/response';

import schema from '../schema/resident';


class ResidentData {
    static async addNewResident(req, res) {
        const newResidentData = { ...req.body };
        try {
            const result = await schema.validateAsync(newResidentData);
            if (!result.error) {
                const addResidents = await db.addResidents(Resident, newResidentData)
                return Response.responseOkCreated(res, addResidents)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async getAllResidents(req, res) {
        try {
            const allResidents = await db.getAllResidents(Resident)
            return Response.responseOk(res, allResidents)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getResidentById(req, res) {
        const { id } = req.params;
        try {
            console.log(id)
            const residentById = await db.getResidentById(Resident, id)
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
                const residentToEdit = await db.editResident(Resident, updateResident)
                return Response.responseOkCreated(res, residentToEdit)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
}
export default ResidentData;