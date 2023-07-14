import { RouteModule } from "../RouteModuleClass";

import { depositController, withdrawController } from "./controllers";
import { saveTxLog } from "../../middlewares";

class TokenModule extends RouteModule {
  publicRoutes() {
    this.router.post("/deposit", depositController, saveTxLog);
    this.router.post("/withdraw", withdrawController, saveTxLog);
  }
}

export const tokenModule = new TokenModule();
