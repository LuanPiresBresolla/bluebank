import { Router } from "express";
import { CreateBalanceController } from "../useCases/createBalance/CreateBalanceController";
import { FindBalancesController } from "../useCases/findBalances/FindBalancesController";
import { FindBalanceTotalController } from "../useCases/findBalanceTotal/FindBalanceTotalController";

const routes = Router();

const createBalanceController = new CreateBalanceController();
const findBalanceTotalController = new FindBalanceTotalController();
const findBalancesController = new FindBalancesController();

routes.post('/', createBalanceController.handle);
routes.get('/', findBalancesController.handle);

routes.get('/total', findBalanceTotalController.handle);

export { routes as balancesRoutes };