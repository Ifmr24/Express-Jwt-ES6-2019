import { Router } from "express";
import jwt from 'jsonwebtoken';
import redis from 'redis';

//let client = redis.createClient();

let users = [
    {
        id: 1,
        username: 'test',
        password: 'asdf123'
    },
    {
        id: 2,
        username: 'test2',
        password: 'asdf12345'
    }
];

var router = Router();
let SECRET_KEY = 'mysecretkey123'; // Usar un .env

router.post("/api/login", async (req, res) => {
    let { username, password } = req.body;
    for (let user of users) {
        if (username == user.username && password == user.password) {
            // Generamos el token y lo enviamos si el usuario logeado es correcto.
            let token = jwt.sign({
                id: user.id,
                username: user.username
            }, SECRET_KEY, { expiresIn: 129600, algorithm: 'HS512' });

            //await client.set(`myapp: ${user.username}`, token)

            res.json({
                sucess: true,
                err: null,
                token
            });

            break;
        } else {
            res.status(401).json({
                sucess: false,
                err: 'Username or password is incorrect',
                token: null
            });
        }
    };
});

export default router