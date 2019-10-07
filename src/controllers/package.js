import moment from 'moment';
import Receipt from '../models/company';
import * as db from '../db/db';
import * as Response from '../helpers/response/response';


class ReceiptData {
    static async addReceipt(req, res) {
        const deliveryDate = req.body.deliveryDate;
        const deliveryTimestamp = moment(deliveryDate, 'YYYY-MM-DD').unix()
        const receiptData = {
            deliveryDate: deliveryTimestamp,
            deliveryTime: req.body.deliveryTime,
            additionalInfo: req.body.additionalInfo,
            name: req.body.name,
            deliverer: req.body.deliverer,
        };
        try {
            // const result = await schema.validateAsync(receiptData);
            // if (!result.error) {
                const receiptInfo = await db.addReceipt(Receipt, receiptData)
                // return Response.responseOkCreated(res, receiptInfo)
                return res.status(200).json(receiptInfo)
            // }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
}

export default ReceiptData;