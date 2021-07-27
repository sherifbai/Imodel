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
const userServices = require("@services/user/user.services");
const modelServices = require("@services/model/model.services");
const agentServices = require("@services/agent/agent.services");
const orderServices = require("@services/order/order.services");
const authServices = require("@services/auth/auth.services");

const authRequiredMiddleware = require("@middlewares/authRequired");
const uploadSettings = require("@uploads"); // потом понадобиться , расскажу

app.post("/auth/register", authServices.register);
app.post("/auth/login", authServices.login);
app.post("/auth/accept_reg", authServices.proof_register);
app.post("/auth/reseatpass", authRequiredMiddleware, authServices.reseat_password);
app.post("/auth/sendcode", authServices.send_code);
app.post("/auth/dischargepass", authServices.discharge_password);

app.get("/user/getUsers", authRequiredMiddleware, userServices.getUsers);
app.get("/user/getMyInfo", authRequiredMiddleware, userServices.getInfo);
app.put("/user/changeMyInfo", authRequiredMiddleware, userServices.changeInfo);
app.delete( "/user/dellprofile", authRequiredMiddleware, userServices.deleteInfo);

app.get("/agent/getAgents", authRequiredMiddleware, agentServices.getAgents);
app.get("/agent/getMyInfo", authRequiredMiddleware, agentServices.getInfo);
app.get("/agent/chekmyref", authRequiredMiddleware, agentServices.checkMyRef);
app.put("/agent/changeMyInfo", authRequiredMiddleware, agentServices.changeInfo);
app.delete("/agent/dellprofile", authRequiredMiddleware, agentServices.deleteInfo);

app.get("/model/getModels", authRequiredMiddleware, modelServices.getModels);
app.get("/model/getMyInfo", authRequiredMiddleware, modelServices.getInfo);
app.put("/model/changeMyInfo", authRequiredMiddleware, modelServices.changeInfo);
app.delete("/model/dellprofile", authRequiredMiddleware, modelServices.deleteInfo);
app.post("/model/take_order", authRequiredMiddleware, modelServices.take_order);

app.post("/order/createOrder", authRequiredMiddleware, orderServices.create_order);
app.get("/order/getmyorders_active", authRequiredMiddleware, orderServices.get_active_orders);
app.post("/order/complete_order", authRequiredMiddleware, orderServices.complete_order);

let server = app.listen(3000);
