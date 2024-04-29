const Express = require("express");
const mysqlController = require('../controllers/uploadDataBaseController')

const Router = Express.Router();

let api_route = "/api";

Router.post(`${api_route}`, mysqlController.post);
module.exports = Router;    