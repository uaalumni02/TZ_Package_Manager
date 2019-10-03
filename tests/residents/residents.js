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

const BASE_URL = '';
const residentPath = '/api/resident';
const userPath = '/api/user';
let validAdminToken;
let id;

describe('Resident', () => {
    before(function (done) {
        this.timeout(20000);
        http.post(userPath)
            .send(Mock.user)
            .end((error, response) => {
                validAdminToken = response.body.token;
                done();
            });
    });

    describe('add Resident', () => {
        it('should not register resident if no valid in header', (done) => {
            request(app)
                .post(residentPath)
                .send(Mock.resident)
                .expect(401, done);
        });
    });

    describe('add Resident', () => {
        it('should register resident since there is a valid header', (done) => {
            request(app)
                .post(residentPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .send(Mock.resident)
                .expect(201, done);
            Mock.resident.should.be.a('object')
            expect(Mock.resident).to.have.property('name');
            expect(Mock.resident).to.have.property('email');
            expect(Mock.resident).to.have.property('phone');
        });
    });
    describe('get Resident', () => {
        it('should not get residents since no valid token', function (done) {
            request(app)
                .get(residentPath)
                .expect(401, done);
        });
    });
    describe('get Resident', () => {
        it('should get residents since valid token', (done) => {
            chai.request(app)
                .get(residentPath)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    id = response.body.data[0]._id
                    response.body.should.be.an('object').to.have.nested.property('data[0].name')
                    response.body.should.be.an('object').to.have.nested.property('data[0].email')
                    response.body.should.be.an('object').to.have.nested.property('data[0].phone')
                    done();
                });
        });
    });
    describe(' get Resident by ID', () => {
        it('should get resident by id since valid token', (done) => {
            chai.request(app)
                .get('/api/resident/' + id)
                .set('Authorization', 'Bearer ' + validAdminToken)
                .end((err, response) => {
                    console.log(response.body)
                    response.body.should.be.an('object').to.have.nested.property('data.name')
                    response.body.should.be.an('object').to.have.nested.property('data.email')
                    response.body.should.be.an('object').to.have.nested.property('data.phone')
                    done();
                });
        });

    });

}).timeout(30000)


// describe('/PATCH/:id Resident', () => {
//     it('it should not UPDATE a resident given the id as token not passed', (done) => {
//         let resident = new Resident({ name: "John Doe", email: 'doe@gmail.com', phone: '888-888-8888' })
//         resident.save((err, resident) => {
//             request(app)
//                 .patch('/api/resident/' + resident.id)
//                 .send({ name: "John", email: 'doe@gmail.com', phone: '888-888-8888' })
//                 .expect(401);
//             done();
//         });
//     });
// });

// describe('/PATCH/:id Resident', () => {
//     it('it should UPDATE a resident given the id as token was passed', (done) => {
//         var token = jwt.sign({
//             id: 1,
//         }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
//         let resident = new Resident({ name: "John Doe", email: 'doe@gmail.com', phone: '888-888-8888' })
//         resident.save((err, resident) => {
//             request(app)
//                 .patch('/api/resident/' + 'resident.id')
//                 .set('Authorization', 'Bearer ' + token)
//                 .send({ name: "John Doe", email: 'doe@gmail.com', phone: '888-888-8888' })
//                 .expect(201, done);
//             resident.should.be.a('object')
//             expect(resident).to.have.property('name');
//             expect(resident).to.have.property('email');
//             expect(resident).to.have.property('phone');

//         });
//     });
// });
// describe('/GET/:id resident', () => {
//     it('it should not GET a resident by the  id as token not passed', (done) => {
//         let resident = new Resident({ name: "John Doe", email: 'doe@gmail.com', phone: '888-888-8888' });
//         resident.save((err, resident) => {
//             const residentId = resident.id
//             request(app)
//                 .get('/api/resident/' + residentId)
//                 .send(resident)
//                 .expect(401)
//             done()
//         });

//     });
// });



