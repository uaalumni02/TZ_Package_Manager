import express from "express";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Token from '../helpers/jwt/token';

//import model
import User from '../models/user';

const router = express.Router();


//create user
router.createUser = ('/', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'user name exist'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {

                    }
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result)
                            const { _id, username } = result;
                            const token = Token.sign({ id: _id, username })

                            res.status(201).json({
                                message: 'User Created',
                                token,
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err

                            });
                        });
                })

            }
        })

});

// //user login
router.logIn = ('/login', (req, res, next) => {

    User.find({
        username: req.body.username,
    })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'auth failed'
                });

            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            username: user[0].username,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '365d'
                        }
                    );
                    return res.status(200).json({
                        token: token,
                        userId: user[0]._id
                    });
                }
                res.status(401).json({
                    message: 'auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//delete user
router.removeUser = ('/:id', (req, res) => {
    const id = req.params.id;
    User.findOneAndDelete({ '_id': id })
        .exec()
        .then(result => {
            res.status(200).json(result);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//show all users
router.allUsers = ('/', (req, res) => {
    User.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//get user by id
router.showUserById = ('/:id', (req, res) => {
    const id = req.params.id;
    User.findById({ '_id': id })
        .exec()
        .then(result => {
            res.status(200).json(result);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



export default router;
