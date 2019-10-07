import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Mock from '../mock/index';
import app from '../../src/server';

const http = request.agent(app);
const { expect } = chai;

chai.use(chaiHttp);
chai.should()

const companyPath = '/api/company';
const userPath = '/api/user';
let validAdminToken;
let id;

describe('Company', () => {
    before(function (done) {
        this.timeout(20000);
        http.post(userPath)
            .send(Mock.user)
            .end((error, response) => {
                validAdminToken = response.body.token;
                done();
            });
    });
    describe('add company', () => {
        it('should not register company if no valid in header', (done) => {
            request(app)
                .post(companyPath)
                .send(Mock.deliverer)
                .expect(401, done);
        });
    });
    describe('add company', () => {
        it('should register company since there is a valid header', (done) => {
            request(app)
                .post(companyPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .send(Mock.deliverer)
                .expect(201, done);
            Mock.deliverer.should.be.a('object')
            expect(Mock.deliverer).to.have.property('name');
        });
    });

    describe('get company', () => {
        it('should not get companies since no valid token', function (done) {
            request(app)
                .get(companyPath)
                .expect(401, done);
        });
    });
    describe('get company', () => {
        it('should get company since valid token', (done) => {
            chai.request(app)
                .get(companyPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    id = response.body.data[0]._id
                    response.body.should.be.a('object').to.have.nested.property('success').to.eql(true);
                    response.body.should.be.an('object').to.have.nested.property('data[0].name')
                    done();
                });
        });
    });
    describe(' get company by ID', () => {
        it('should not get company by id since no valid token', (done) => {
            request(app)
                .get('/api/company/' + id)
                .expect(401, done);
        });
    });

    describe(' get company by ID', () => {
        it('should get company by id since valid token', (done) => {
            chai.request(app)
                .get('/api/company/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    response.body.should.be.a('object').to.have.nested.property('success').to.eql(true);
                    response.body.should.be.an('object').to.have.nested.property('data.name')
                    done();
                });
        });

    });

}).timeout(30000)





