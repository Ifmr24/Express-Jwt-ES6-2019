import express from 'express';
import jwt from 'jsonwebtoken';

let SECRET_KEY = 'mysecretkey123'; // Usar un .env

export const authClientToken = async (req, res, next) => {

    let header = req.headers['authorization'];

    if (typeof header !== 'undefined') {

        let bearer = header.split(' ');
        let token = bearer[1];

        if (!token) {

            return res.status(401).json({ err: 'No token provided' });

        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {

            if (err) {
                return res.status(401).json({ err: 'Invalid Token' });
            }
            
            req.token = token;
            return next();

        });

    } else {
        res.status(401).json({ err: 'No token provided' });
    }

};