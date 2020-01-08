import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
const { log, error } = console;

mongoose.Promise = global.Promise

const port = process.env.PORT || 3000;

const router = express.Router();

//import routes
import residentRoutes from './routes/resident.route'
import userRoutes from './routes/user.route';
import companyRoutes from './routes/company.route';
import packageRoutes from './routes/package.route';
import adminRoutes from './routes/admin.route';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



const DB_URL = process.env.MONGO_URL;
const TEST_DB_URL = process.env.MONGO_TEST_URL;

if (process.env.NODE_ENV == "test") {
    mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }, (err) => {
        if (err)
            return log('Unable to Connect to MongoDB')
        return log('Connection Successful to test DB')
    })
} else {
    mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
        if (err)
            return log('Unable to Connect to MongoDB')
        return log('Connection Successful')
    })
}

//middleware to utilize routes
router.use('/resident', residentRoutes);
router.use('/user', userRoutes);
router.use('/company', companyRoutes);
router.use('/package', packageRoutes);
router.use('/admin', adminRoutes);

app.use('/api', router);

app.listen(port, () => log('server is running'));
export default app;
