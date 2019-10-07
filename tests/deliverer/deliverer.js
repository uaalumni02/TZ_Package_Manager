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

const deliveryPath = '/api/deliverer';
const userPath = '/api/user';
let validAdminToken;
let id;

describe('Deliverer', () => {
    before(function (done) {
        this.timeout(20000);
        http.post(userPath)
            .send(Mock.user)
            .end((error, response) => {
                validAdminToken = response.body.token;
                done();
            });
    });
    describe('add Deliverer', () => {
        it('should not register deliverer if no valid in header', (done) => {
            request(app)
                .post(deliveryPath)
                .send(Mock.deliverer)
                .expect(401, done);
        });
    });
    describe('add Deliverer', () => {
        it('should register deliverer since there is a valid header', (done) => {
            request(app)
                .post(deliveryPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .send(Mock.deliverer)
                .expect(201, done);
            Mock.deliverer.should.be.a('object')
            expect(Mock.deliverer).to.have.property('name');
        });
    });

    describe('get Deliver', () => {
        it('should not get deliverers since no valid token', function (done) {
            request(app)
                .get(deliveryPath)
                .expect(401, done);
        });
    });
    describe('get Deliverer', () => {
        it('should get deliverer since valid token', (done) => {
            chai.request(app)
                .get(deliveryPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    id = response.body.data[0]._id
                    response.body.should.be.a('object').to.have.nested.property('success').to.eql(true);
                    response.body.should.be.an('object').to.have.nested.property('data[0].name')
                    done();
                });
        });
    });
    describe(' get deliverer by ID', () => {
        it('should not get deliverer by id since no valid token', (done) => {
            request(app)
                .get('/api/deliverer/' + id)
                .expect(401, done);
        });
    });

    describe(' get deliverer by ID', () => {
        it('should get deliverer by id since valid token', (done) => {
            chai.request(app)
                .get('/api/deliverer/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    response.body.should.be.a('object').to.have.nested.property('success').to.eql(true);
                    response.body.should.be.an('object').to.have.nested.property('data.name')
                    done();
                });
        });

    });

}).timeout(30000)





