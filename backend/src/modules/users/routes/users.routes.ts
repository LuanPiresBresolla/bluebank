import { Router } from "express";
import { CheckUserExistsController } from "../useCases/checkUserExists/CheckUserExistsController";
import { CreateUserController } from "../useCases/createUser/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const checkUserExistsController = new CheckUserExistsController();

routes.post('/', createUserController.handle);
routes.get('/check', checkUserExistsController.handle);

export { routes as usersRoutes };