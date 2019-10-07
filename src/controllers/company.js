import Company from '../models/company';
import * as db from '../db/db';
import * as Response from '../helpers/response/response';


import schema from '../schema/delivery';

class DeliveryData {
    static async addDeliveryName(req, res) {
        const deliveryData = { ...req.body };
        try {
            const result = await schema.validateAsync(deliveryData);
            if (!result.error) {
                const deliveryName = await db.addDelivery(Company, deliveryData)
                return Response.responseOkCreated(res, deliveryName)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async allDeliverers(req, res) {
        try {
            const allDeliveryNames = await db.getAllDeliverers(Company)
            return Response.responseOk(res, allDeliveryNames)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getDelivererById(req, res) {
        const { id } = req.params;
        try {
            const delivererById = await db.getDelivererById(Company, id)
            return Response.responseOk(res, delivererById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
}

export default DeliveryData