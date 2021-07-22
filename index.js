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
const userServices = require('@services/user.services');
const modelServices = require('@services/model.services');
const agentServices = require('./services/agent.services')
// const modelServices = require("@services/employer.services");
const authServices = require('@services/auth.services')

const authRequiredMiddleware = require("@middlewares/authRequired");
const is10 = require('./middlewares/is10')
const uploadSettings = require('@uploads'); // потом понадобиться , расскажу

//Авторизация
app.post('/auth/register', authServices.register);
app.post('/auth/login', authServices.login);
app.post('/auth/accept_reg', authServices.proof_register)
//Роуты юзера
app.get("/user/getUsers",authRequiredMiddleware, userServices.getUsers);
app.delete("/user/dellprofile/:_id", userServices.deleteUserProfile)
app.post("/user/getMyInfo/:_id", userServices.getMyInfo); //пример получения инфы о юзере
app.post("/user/changeMyInfo/:_id", userServices.changeInfo); //пример изменения
//Роуты агента
app.get('/agent/getAgents', is10, agentServices.getAgents)
app.get("/agent/chekmyref/:_id", is10, agentServices.checkMyRef)
app.delete("/agent/dellprofile/:_id", is10, agentServices.deleteAgentProfile)
app.post("/agent/getMyInfo/:_id", is10, agentServices.getMyInfo);
app.post("/agent/changeMyInfo/:_id", is10, agentServices.changeInfo);
//Роуты модели
app.get("/model/getModels", authRequiredMiddleware, modelServices.getModels);
app.post("/model/getMyInfo/:_id", authRequiredMiddleware, modelServices.getMyInfo);
app.post("/model/changeMyInfo/:_id", authRequiredMiddleware, modelServices.changeMyInfo);
app.delete("/model/dellprofile/:_id", authRequiredMiddleware, modelServices.deleteModelProfile)


let server = app.listen(3000);