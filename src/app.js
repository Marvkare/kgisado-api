import express from "express";
import morgan from "morgan";

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import compradoresRoutes from "./routes/compradores.routes.js"
import repartidoresRouters from "./routes/repartidores.routes.js"
import platillosRouters from  "./routes/platillos.routers.js"
import proveedoresRouters from "./routes/proveedores.router.js"
import pedidosRouters from "./routes/pedidos.routers.js"
import auth from "./routes/auth.routes.js"

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api", compradoresRoutes)
app.use("/api", repartidoresRouters)
app.use("/api", platillosRouters);
app.use("/api", proveedoresRouters)
app.use("/api", pedidosRouters);
app.use("./api", auth)

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;