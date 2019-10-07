import Deliverer from '../models/deliverer';
import * as db from '../db/db';
import * as Response from '../helpers/response/response';


import schema from '../schema/delivery';

class deliveryData {
    static async addDeliveryName(req, res) {
        const deliveryData = { ...req.body };
        try {
            const result = await schema.validateAsync(deliveryData);
            if (!result.error) {
                const deliveryName = await db.addDelivery(Deliverer, deliveryData)
                return Response.responseOkCreated(res, deliveryName)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async allDeliverers(req, res) {
        try {
            const allDeliveryNames = await db.getAllDeliverers(Deliverer)
            return Response.responseOk(res, allDeliveryNames)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getDelivererById(req, res) {
        const { id } = req.params;
        try {
            const delivererById = await db.getDelivererById(Deliverer, id)
            return Response.responseOk(res, delivererById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
}

export default deliveryData