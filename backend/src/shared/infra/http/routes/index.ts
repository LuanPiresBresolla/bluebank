import { Router } from "express";
import { balancesRoutes } from "../../../../modules/balances/routes/balances.routes";

import { sessionsRoutes } from "../../../../modules/users/routes/sessions.routes";
import { usersRoutes } from "../../../../modules/users/routes/users.routes";
import ensureAuthenticated from "../../middlewares/ensureAuthenticated";

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);

routes.use('/balances', ensureAuthenticated, balancesRoutes);

export { routes };