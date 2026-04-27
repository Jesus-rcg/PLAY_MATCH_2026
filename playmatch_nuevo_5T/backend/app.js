import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swagger from "./swagger.js";

import { verificarToken } from "./middleware/auth.js";
import loginRoutes from "./routes/login.routes.js"
import encuentrosRoutes from "./routes/encuentros.routes.js"
import equiposRoutes from "./routes/equipos.routes.js"
import jugadoresRoutes from "./routes/jugadores.routes.js"
import posicionesRoutes from "./routes/posiciones.routes.js"
import resultadosRoutes from "./routes/resultados.routes.js"
import torneosRoutes from "./routes/torneos.routes.js"
import usuariosRoutes from "./routes/usuarios.routes.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swagger.specs));

app.use("/api/login", loginRoutes);
app.use("/api/encuentros", verificarToken, encuentrosRoutes);
app.use("/api/equipos", verificarToken, equiposRoutes);
app.use("/api/jugadores", verificarToken, jugadoresRoutes);
app.use("/api/posiciones", verificarToken, posicionesRoutes);
app.use("/api/resultados", verificarToken, resultadosRoutes);
app.use("/api/torneos", verificarToken, torneosRoutes);
app.use("/api/usuarios", verificarToken, usuariosRoutes);


export default app;