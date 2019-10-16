import moment from 'moment';
import Package from '../models/package';
import * as db from '../db/db';
import * as Response from '../helpers/response/response';

import schema from '../schema/package';

class PackageData {
    static async addPackage(req, res) {
        const packageData = { ...req.body };
        const deliveryTimestamp = moment(packageData.deliveryDate, 'YYYY-MM-DD').unix()
        packageData.deliveryDate = deliveryTimestamp
        try {
            const result = await schema.validateAsync(packageData);
            if (!result.error) {
                const packageInfo = await db.addPackage(Package, packageData)
                return Response.responseOkCreated(res, packageInfo)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async getAllPackages(req, res) {
        try {
            const allPackages = await db.getAllPackages(Package)
            return res.status(200).json(allPackages)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async getPackageByResident(req, res) {
        const { resident } = req.params;
        try {
            const packageByResident = await db.getPackageByResident(Package, resident)
            return res.status(200).json(packageByResident)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async deletePackage(req, res) {
        const { resident } = req.params;
        try {
            const packageToDelete = await db.removePackage(Package, resident)
            return res.status(200).json(packageToDelete)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}


export default PackageData;