import Db from '../db/db';
import Package from '../models/package';

import * as Response from '../helpers/response/response';
import schema from '../schema/package';

import moment from 'moment';

class PackageData {
    static async addPackage(req, res) {
        const packageData = { ...req.body };
        const deliveryTimestamp = moment(packageData.deliveryDate, 'YYYY-MM-DD').unix()
        packageData.deliveryDate = deliveryTimestamp
        try {
            const result = await schema.validateAsync(packageData);
            if (!result.error) {
                const packageInfo = await Db.addPackage(Package, packageData)
                return Response.responseOkCreated(res, packageInfo)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async getAllPackages(req, res) {
        try {
            const allPackages = await Db.getAllPackages(Package)
            return res.status(200).json(allPackages)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async getPackageByResident(req, res) {
        const { resident } = req.params;
        try {
            const packageByResident = await Db.getPackageByResident(Package, resident)
            return res.status(200).json(packageByResident)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async deletePackage(req, res) {
        const { resident } = req.params;
        try {
            const packageToDelete = await Db.removePackage(Package, resident)
            return res.status(200).json(packageToDelete)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
    static async getPackageByDate(req, res) {
        const { deliveryDate } = req.params;
        try {
            const packageByDate = await Db.getPackageByDate(Package, deliveryDate)
            return res.status(200).json(packageByDate)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}


export default PackageData;