import 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Mock from '../__mocks__/index';
import app from '../../src/server';

const http = request.agent(app);
const { expect } = chai;

chai.use(chaiHttp);
chai.should()

const packagePath = '/api/package';
const userPath = '/api/user';
let validAdminToken;
let id;

describe('Package', () => {
    before(function (done) {
        this.timeout(20000);
        http.post(userPath)
            .send(Mock.user)
            .end((error, response) => {
                validAdminToken = response.body.userdata.token;
                done();
            });
    });
    describe('add package', () => {
        it('should not add package if no valid in header', (done) => {
            request(app)
                .post(packagePath)
                .send(Mock.package)
                .expect(401, done);
        });
    });
    describe('add package', () => {
        it('should register package since there is a valid header', (done) => {
            request(app)
                .post(packagePath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .send(Mock.package)
                .expect(201, done);
            Mock.package.should.be.a('object')
            expect(Mock.package).to.have.property('deliveryDate');
        });
    });
    describe('get package', () => {
        it('should not get packages since no valid token', (done) => {
            request(app)
                .get(packagePath)
                .expect(401, done);
        });
    });
    describe('get package', () => {
        it('should get package since valid token', (done) => {
            chai.request(app)
                .get(packagePath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    id = response.body.data[0]._id
                    response.body.should.be.a('object');
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body.data[0]).to.have.property('deliveryDate')
                    expect(response.body.data[0]).to.have.property('deliveryTime')
                    expect(response.body.data[0]).to.have.property('additionalInfo')
                    done();
                });
        });
    });
    describe(' get package by id', () => {
        it('should not get package by id since no valid token', (done) => {
            request(app)
                .get('/api/package/' + id)
                .expect(401, done);
        });
    });
    describe(' get package by ID', () => {
        it('should get package by id since valid token', (done) => {
            chai.request(app)
                .get('/api/package/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    response.body.should.be.a('object');
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    expect(response.body).to.have.nested.property('data.deliveryDate')
                    expect(response.body).to.have.nested.property('data.deliveryTime')
                    expect(response.body).to.have.nested.property('data.additionalInfo')
                    done();
                });
        });
    });
    describe(' delete package by id', () => {
        it('should not delete by id since no valid token', (done) => {
            request(app)
                .delete('/api/package/' + id)
                .expect(401, done);
        });
    });
    describe(' delete package by id', () => {
        it('should delete by package since valid token', (done) => {
            request(app)
                .delete('/api/package/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    expect(response.body).to.have.nested.property('success').to.eql(true);
                    done();
                });
        });
    });

}).timeout(90000)