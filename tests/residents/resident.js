import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import request from 'supertest';
import Mock from './mock.json'
import app from '../../src/server';

const http = request.agent(app);
const { expect } = chai;

chai.use(chaiHttp);
chai.should()

const BASE_URL = '';
const residentPath = '/api/resident';
const userPath = '/api/user';

describe('Resident', () => {

    let validAdminToken;
    before(function (done) {
        this.timeout(20000);
        return http.post(userPath)
            .send(Mock.exampleAdmin)
            .end((error, response) => {
                validAdminToken = error ? error : response;
                done();
            });
    });

    describe('add Resident', () => {
        // Create a new user in your DB
        console.log(validAdminToken)
        it('should not register resident if no valid in header', (done) => {
            request(app)
                .post('/api/resident')
                .send(Mock.exampleUser1)
                .expect(401, done);
        });

        // it('should register a user if valid token in header', (done) => {

        // })
    });


    // ---- End of add

}).timeout(30000)


// describe('/POST Resident', () => {
//     it('it should post resident since token was sent', (done) => {
//         var token = jwt.sign({
//             id: 1,
//         }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

//         request(app)
//             .post('/api/resident')
//             .set('Authorization', 'Bearer ' + token)
//             .send(Data)
//             .expect(201, done);
//         Data.should.be.a('object')
//         expect(Data).to.have.property('name');
//         expect(Data).to.have.property('email');
//         expect(Data).to.have.property('phone');
//     });
// });


// describe('/GET Resident', () => {
//     it('should not be able to consume the route since no token was sent', function (done) {
//         request(app)
//             .get('/api/resident')
//             .expect(401, done);
//     });
// });

// describe('/GET Resident', () => {
//     it('it should GET all residents', (done) => {
//         var token = jwt.sign({
//             id: 1,
//         }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
//         chai.request(app)
//             .get('/api/resident')
//             .set('Authorization', 'Bearer ' + token)
//             .end((err, Data) => {
//                 Data.body.should.be.a('object')
//                 done();
//             });
//     });
// });
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

// describe('/GET/:id resident', () => {
//     it('it should GET a resident by id', (done) => {
//         var token = jwt.sign({
//             id: 1,
//         }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
//         let resident = new Resident({ name: "John Doe", email: 'doe@gmail.com', phone: '888-888-8888' });
//         resident.save((err, resident) => {
//             const id = resident._id
//             request(app)
//                 .get('/api/resident/' + id)
//                 .set('Authorization', 'Bearer ' + token)
//                 .send(resident)
//                 .end((err, response) => {
//                     response.body.should.be.a('object')
//                     expect(response.body).to.have.property('name');
//                     expect(response.body).to.have.property('email');
//                     expect(response.body).to.have.property('phone');
//                     done();
//                 });

//         });

//     });
// });

