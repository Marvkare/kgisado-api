import express from "express";
import morgan from "morgan";
import fileUpload from 'express-fileupload'
import path from "path";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
//import compradoresRoutes from "./routes/compradores.routes.js"
//import repartidoresRouters from "./routes/repartidores.routes.js"
import platillosRouters from  "./routes/platillos.routers.js"
import usuarioRouters from "./routes/usuario.router.js"
import pedidosRouters from "./routes/pedidos.routers.js"
import auth from "./routes/auth.routes.js"
import cors from "cors"
import fileDirname from './file-dir-name.js'
const { __dirname, __filename } = fileDirname(import.meta);
const app = express();

// Middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './src/uploads'
}));
//lista de direcciones a las que pueden acceder
app.use('/images', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use("/", indexRoutes);
app.use("/api", employeesRoutes);
app.use("/api", usuarioRouters)
//app.use("/api", repartidoresRouters)
app.use("/api", platillosRouters);
app.use("/api", usuarioRouters)
app.use("/api", pedidosRouters);
app.use("/api", auth)



app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;