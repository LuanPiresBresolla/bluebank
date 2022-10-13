import { Router } from "express";
import { CreateSessionController } from "../useCases/createSession/CreateSessionController";

const routes = Router();

const createSessionController = new CreateSessionController();

routes.post('/', createSessionController.handle);

export { routes as sessionsRoutes };