import express from 'express';
//import Mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import { authClientToken } from './helpers/authGuard';

//  Routes
import Login from './router/Login.routes';
import Test from './router/Test.routes';

let app = express();

let init = () => {

    app.use(json());
    app.use(urlencoded({ extended: false }));

    // Rutas
    app.use(Login)
    app.use(authClientToken, Test)
    
    app.listen(5000, () => {
        console.log('Servidor api en el puerto 5000 !')
    })

};

init();
