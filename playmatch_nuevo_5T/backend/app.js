import express from "express";
import cors from "cors";

import loginRoutes from "./routes/login.routes.js"
import encuentrosRoutes from "./routes/encuentros.routes.js"
import equiposRoutes from "./routes/equipos.routes.js"
import jugadoresRoutes from "./routes/jugadores.routes.js"
import posicionesRoutes from "./routes/posiciones.routes.js"
import resultadosRoutes from "./routes/resultados.routes.js"
import torneosRoutes from "./routes/torneos.controller.js"
import usuariosRoutes from "./routes/usuarios.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRoutes);
app.use("/api/encuentros", encuentrosRoutes);
app.use("/api/equipos", equiposRoutes);
app.use("/api/jugadores", jugadoresRoutes);
app.use("/api/posiciones", posicionesRoutes);
app.use("/api/resultados", resultadosRoutes);
app.use("/api/torneos", torneosRoutes);
app.use("/api/usuarios", usuariosRoutes);

export default app;