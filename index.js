require("module-alias/register");
const cors = require("cors");
const express = require("express");
var app = express();

require("dotenv").config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

/* MONGODB SETUP */
require("@connections/mongodb.connection");

/* API ENDPOINTS */
const userServices = require("@services/user.services");
const modelServices = require("@services/model.services");
const agentServices = require("./services/agent.services");
// const modelServices = require("@services/employer.services");
const authServices = require("@services/auth.services");

const authRequiredMiddleware = require("@middlewares/authRequired");
const is10 = require("./middlewares/is10");
const uploadSettings = require("@uploads"); // потом понадобиться , расскажу

app.post("/auth/register", authServices.register);
app.post("/auth/login", authServices.login);
app.post("/auth/accept_reg", authServices.proof_register);

app.get("/user/getUsers", authRequiredMiddleware, userServices.getUsers);
app.delete(
  "/user/dellprofile",
  authRequiredMiddleware,
  userServices.deleteUserProfile
);
app.post("/user/getMyInfo", authRequiredMiddleware, userServices.getMyInfo);
app.post("/user/changeMyInfo", authRequiredMiddleware, userServices.changeInfo);

app.get(
  "/agent/getAgents",
  is10,
  authRequiredMiddleware,
  agentServices.getAgents
);
app.get(
  "/agent/chekmyref",
  is10,
  authRequiredMiddleware,
  agentServices.checkMyRef
);
app.delete(
  "/agent/dellprofile",
  is10,
  authRequiredMiddleware,
  agentServices.deleteAgentProfile
);
app.post(
  "/agent/getMyInfo",
  is10,
  authRequiredMiddleware,
  agentServices.getMyInfo
);
app.post(
  "/agent/changeMyInfo",
  is10,
  authRequiredMiddleware,
  agentServices.changeInfo
);

app.get("/model/getModels", authRequiredMiddleware, modelServices.getModels);
app.post("/model/getMyInfo", authRequiredMiddleware, modelServices.getMyInfo);
app.post(
  "/model/changeMyInfo",
  authRequiredMiddleware,
  modelServices.changeMyInfo
);
app.delete(
  "/model/dellprofile",
  authRequiredMiddleware,
  modelServices.deleteModelProfile
);

let server = app.listen(3000);
