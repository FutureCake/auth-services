import express from "express";
import * as emailAuthController from "../controllers/email.auth.controller";

const route = express.Router();

route.post('/login', emailAuthController.login);
route.post('/register', emailAuthController.register);
route.post('/trail', emailAuthController.trail);
route.post('/quick-access', emailAuthController.quick);

export default route;