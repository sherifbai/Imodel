require("module-alias/register");
const cors = require("cors");
const express = require("express");
var app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

/* MONGODB SETUP */
require("@connections/mongodb.connection");

/* API ENDPOINTS */
const userServices = require("@services/worker.services");
const agentServices = require("@services/user.services");
const modelServices = require("@services/employer.services");
const authServices = require('@services/auth.services')

const authRequiredMiddleware = require("@middlewares/authRequired");
const uploadSettings = require('@uploads'); // потом понадобиться , расскажу

//Авторизация
app.post('/auth/register', authServices.register)
app.post('/auth/login', authServices.login)
//Роуты юзера
app.post("/user/getMyInfo", authRequiredMiddleware,  userServices.getMyInfo); //пример получения инфы о юзере
app.post("/user/changeMyInfo", authRequiredMiddleware,  userServices.getMyInfo); //пример изменения
//Роуты агента
//Роуты модели


let server = app.listen(3000);