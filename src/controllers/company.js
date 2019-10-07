import Company from '../models/company';
import * as db from '../db/db';
import * as Response from '../helpers/response/response';


import schema from '../schema/company';

class CompanyData {
    static async addCompanyName(req, res) {
        const companyData = { ...req.body };
        try {
            const result = await schema.validateAsync(companyData);
            if (!result.error) {
                const companyName = await db.addCompany(Company, companyData)
                return Response.responseOkCreated(res, companyName)
            }
        } catch (error) {
            return Response.responseBadRquest(res)
        }
    }
    static async allCompanies(req, res) {
        try {
            const allCompanyNames = await db.getAllCompanies(Company)
            return Response.responseOk(res, allCompanyNames)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
    static async getCompanyById(req, res) {
        const { id } = req.params;
        try {
            const companyById = await db.getCompanyById(Company, id)
            return Response.responseOk(res, companyById)
        } catch (error) {
            return Response.responseNotFound(res)
        }
    }
}

export default CompanyData