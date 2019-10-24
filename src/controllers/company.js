import  Db from '../db/db';
import Company from '../models/company';

import schema from '../schema/company';
import * as Response from '../helpers/response/response';

class CompanyData {
    static async addCompanyName(req, res) {
        const companyData = { ...req.body };
        try {
            const result = await schema.validateAsync(companyData);
            if (!result.error) {
                const companyName = await Db.addCompany(Company, companyData)
                return Response.responseOkCreated(res, companyName)
            } 
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async allCompanies(req, res) {
        try {
            const allCompanyNames = await Db.getAllCompanies(Company)
            return Response.responseOk(res, allCompanyNames)
        } catch (error) {
            return Response.responseServerError(res)
        }
    }
    static async getCompanyById(req, res) {
        const { id } = req.params;
        try {
            const companyById = await Db.getCompanyById(Company, id)
            return Response.responseOk(res, companyById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
}

export default CompanyData