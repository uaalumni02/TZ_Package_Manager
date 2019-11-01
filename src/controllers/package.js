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
            return Response.responseServerError(res)
        }
    }
    static async getAllPackages(req, res) {
        try {
            const allPackages = await Db.getAllPackages(Package)
            return Response.responseOk(res, allPackages)
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
    static async getPackageByResident(req, res) {
        const { resident } = req.params;
        try {
            const packageByResident = await Db.getPackageByResident(Package, resident)
            return Response.responseOk(res, packageByResident)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async deletePackage(req, res) {
        const { resident } = req.params;
        try {
            const packageToDelete = await Db.removePackage(Package, resident)
            return Response.responseOk(res, packageToDelete)
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
    static async getPackageByDate(req, res) {
        const { deliveryDate } = req.params;
        try {
            const packageByDate = await Db.getPackageByDate(Package, deliveryDate)
            return Response.responseOk(res, packageByDate)
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
}


export default PackageData;