import Resident from '../models/resident';
import * as db from '../db/db';

class ResidentData {
    static async addNewResident(req, res) {
        const newResidentData = { ...req.body };
        try {
            const addResidents = await db.addResidents(Resident, newResidentData)
            return res.status(200).json(addResidents)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async getAllResidents(req, res) {
        try {
            const allResidents = await db.getAllResidents(Resident)
            return res.status(200).json(allResidents)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async getResidentById(req, res) {
        const { id } = req.params;
        try {
            const residentById = await db.getResidentById(Resident, id)
            return res.status(200).json(residentById)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async editResident(req, res) {
        const { name, email, phone } = req.body,
            updateResident = { name, email, phone };
        try {
            const residentToEdit = await db.editResident(Resident, updateResident)
            return res.status(200).json(residentToEdit)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}
export default ResidentData;