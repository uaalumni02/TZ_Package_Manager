import Delivery from '../models/delivery';
import * as db from '../db/db';
import * as Response from '../helpers/response/response';
import delivery from '../models/delivery';

import schema from '../schema/delivery';

class deliveryData {
    static async addDeliveryName(req, res) {
        const deliveryData = { ...req.body };
        try {
            const result = await schema.validateAsync(deliveryData);
            if (!result.error) {
                const deliveryName = await db.addDelivery(Delivery, deliveryData)
                return Response.responseOkCreated(res, deliveryName)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
}

export default deliveryData